import {
	fetchJobById,
	subscribeJobUpdates,
	type ITaskJob,
} from "./sceneRenamerApi";

export interface ITaskProgressEvent {
	progress: number;
	status: string;
	error?: string | null;
	source: "preflight" | "ws" | "poll";
}

export interface ITaskFinalEvent {
	status: string;
	error?: string | null;
}

function toPercent(value: any): number {
	const n = Number(value);
	if (!Number.isFinite(n)) return 0;
	if (n <= 1) return Math.max(0, Math.min(100, Math.round(n * 100)));
	return Math.max(0, Math.min(100, Math.round(n)));
}

function isTerminal(statusValue?: string | null): boolean {
	const s = String(statusValue || "").toUpperCase();
	return s === "FINISHED" || s === "FAILED" || s === "CANCELLED";
}

export function trackTaskJob(
	jobId: string,
	handlers: {
		onProgress: (event: ITaskProgressEvent) => void;
	},
): { stop: () => void; done: Promise<ITaskFinalEvent> } {
	let done = false;
	let stopSocket: (() => void) | null = null;
	let pollTimer: number | null = null;
	let resolveDone!: (value: ITaskFinalEvent) => void;
	let maxProgress = 0;

	const donePromise = new Promise<ITaskFinalEvent>((resolve) => {
		resolveDone = resolve;
	});

	const finish = (status: string, error?: string | null) => {
		if (done) return;
		done = true;
		if (pollTimer != null) {
			window.clearInterval(pollTimer);
			pollTimer = null;
		}
		if (stopSocket) {
			stopSocket();
			stopSocket = null;
		}
		resolveDone({ status, error });
	};

	const emit = (source: ITaskProgressEvent["source"], job: ITaskJob) => {
		const status = String(job?.status || "Running...");
		let progress = toPercent(job?.progress);

		if (progress < maxProgress && !isTerminal(status)) {
			progress = maxProgress;
		} else {
			maxProgress = Math.max(maxProgress, progress);
		}

		const error = job?.error || null;
		console.log(`[Scene Renamer][TaskProgress][${source}]`, {
			jobId,
			status,
			progress,
			error,
		});
		handlers.onProgress({ source, status, progress, error });
		if (isTerminal(status)) {
			finish(status, error);
		}
	};

	const pollOnce = async () => {
		if (done) return;
		try {
			const snapshot = await fetchJobById(jobId);
			if (!snapshot) return;
			emit("poll", snapshot);
		} catch {
			// Ignore polling errors and keep going.
		}
	};

	(async () => {
		try {
			const firstSnapshot = await fetchJobById(jobId);
			if (firstSnapshot) {
				emit("preflight", firstSnapshot);
				if (done) return;
			}
		} catch {
			// Ignore preflight errors.
		}

		stopSocket = subscribeJobUpdates(jobId, {
			onUpdate: async (job) => {
				if (done) return;
				emit("ws", job);
			},
			onError: async () => {
				console.warn("[Scene Renamer][TaskProgress][ws-error]", { jobId });
				if (done) return;
				await pollOnce();
			},
		});

		pollTimer = window.setInterval(() => {
			void pollOnce();
		}, 1500);

		await pollOnce();
	})();

	return {
		stop: () => finish("Cancelled", "tracking stopped"),
		done: donePromise,
	};
}
