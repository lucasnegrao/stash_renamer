import { TaskProgressOverlay } from "./components/shared/TaskProgressOverlay";
import {
	fetchPluginRuntimeConfig,
	installRuntimeServiceTask,
	setPluginRuntimeConfig,
} from "./api/stasheroApi";
import {
	getRenamerTaskOverlayState,
	resetRenamerRuntimeState,
	setActiveTabState,
	subscribeRenamerTaskOverlayState,
} from "./services/renamerRuntimeState";
import { trackTaskJob } from "./services/taskProgressService";
import { ensureSceneRenamerStyles } from "./styles/sceneRenamerStyles";
import { EditorView } from "./views/EditorView";
import { RenamerResults } from "./views/ResultsView";
import { SettingsView } from "./views/SettingsView";

(() => {
	console.log("ëntry");
	const PluginApi = window.PluginApi;
	const React = PluginApi.React;
	const { Button, Nav } = PluginApi.libraries.Bootstrap;
	const { NavLink, Route, Switch, useLocation } =
		PluginApi.libraries.ReactRouterDOM;
	const { faEthernet } = PluginApi.libraries.FontAwesomeSolid;
	let runtimeReady = false;
	const runtimeReadyListeners = new Set<(ready: boolean) => void>();
	const getRuntimeReady = () => runtimeReady;
	const setRuntimeReady = (next: boolean) => {
		runtimeReady = Boolean(next);
		runtimeReadyListeners.forEach((listener) => listener(runtimeReady));
	};
	const subscribeRuntimeReady = (listener: (ready: boolean) => void) => {
		runtimeReadyListeners.add(listener);
		return () => runtimeReadyListeners.delete(listener);
	};
	type IRuntimeBootstrapState = {
		done: boolean;
		error: string;
		overlay: {
			show: boolean;
			progress: number;
			text: string;
		};
	};
	let runtimeBootstrapStarted = false;
	let runtimeBootstrapState: IRuntimeBootstrapState = {
		done: false,
		error: "",
		overlay: {
			show: true,
			progress: 0,
			text: "Preparing Stashero runtime...",
		},
	};
	const runtimeBootstrapListeners = new Set<
		(state: IRuntimeBootstrapState) => void
	>();
	const getRuntimeBootstrapState = () => runtimeBootstrapState;
	const setRuntimeBootstrapState = (
		next:
			| IRuntimeBootstrapState
			| ((prev: IRuntimeBootstrapState) => IRuntimeBootstrapState),
	) => {
		runtimeBootstrapState =
			typeof next === "function" ? next(runtimeBootstrapState) : next;
		setRuntimeReady(runtimeBootstrapState.done && !runtimeBootstrapState.error);
		runtimeBootstrapListeners.forEach((listener) =>
			listener(runtimeBootstrapState),
		);
	};
	const subscribeRuntimeBootstrap = (
		listener: (state: IRuntimeBootstrapState) => void,
	) => {
		runtimeBootstrapListeners.add(listener);
		return () => runtimeBootstrapListeners.delete(listener);
	};
	const startRuntimeBootstrap = async () => {
		if (runtimeBootstrapStarted) return;
		runtimeBootstrapStarted = true;
		try {
			const runtime = await fetchPluginRuntimeConfig("stashero");
			if (runtime.installed && String(runtime.pythonPath || "").trim()) {
				setRuntimeBootstrapState((prev) => ({
					...prev,
					done: true,
					error: "",
					overlay: { ...prev.overlay, show: false },
				}));
				return;
			}

			setRuntimeBootstrapState((prev) => ({
				...prev,
				overlay: {
					show: true,
					progress: 5,
					text: "Installing plugin runtime service...",
				},
			}));

			const jobId = await installRuntimeServiceTask();
			if (!jobId) {
				throw new Error("runtime install task did not return a job id");
			}

			const tracker = trackTaskJob(jobId, {
				onProgress: ({ progress, status, error }) => {
					setRuntimeBootstrapState((prev) => ({
						...prev,
						overlay: {
							show: true,
							progress: Math.max(5, Math.min(100, Number(progress || 0))),
							text: error
								? `Runtime install: ${status} - ${String(error)}`
								: `Runtime install: ${status}`,
						},
					}));
				},
			});
			const final = await tracker.done;
			if (String(final.status || "").toUpperCase() !== "FINISHED") {
				throw new Error(
					final.error ||
						`runtime install task finished with status ${final.status}`,
				);
			}

			const nextRuntime = await fetchPluginRuntimeConfig("stashero");
			if (
				!nextRuntime.installed ||
				String(nextRuntime.pythonPath || "").trim().length === 0
			) {
				await setPluginRuntimeConfig({
					pluginId: "stashero",
					installed: false,
					pythonPath: "",
				});
				throw new Error(
					"runtime install task finished but plugin config is still missing pythonPath",
				);
			}
			setRuntimeBootstrapState((prev) => ({
				...prev,
				done: true,
				error: "",
				overlay: { ...prev.overlay, show: false },
			}));
		} catch (e: any) {
			const message = String(e?.message || e || "runtime setup failed");
			try {
				await setPluginRuntimeConfig({
					pluginId: "stashero",
					installed: false,
					pythonPath: "",
				});
			} catch {
				// ignore config rollback failures
			}
			setRuntimeBootstrapState((prev) => ({
				...prev,
				done: true,
				error: message,
				overlay: { ...prev.overlay, show: false },
			}));
		}
	};
	const isRenamerPath = (pathname: string) =>
		pathname === "/plugins/stashero" ||
		pathname.startsWith("/plugins/stashero/");
	let currentPath = String(window.location?.pathname || "");
	let patchesEnabled = isRenamerPath(currentPath);

	PluginApi.Event.addEventListener("stash:location", (e: any) => {
		const nextPath = String(e?.detail?.data?.location?.pathname || "");
		const wasEnabled = patchesEnabled;
		patchesEnabled = isRenamerPath(nextPath);
		currentPath = nextPath;
		if (patchesEnabled && !wasEnabled) {
			resetRenamerRuntimeState();
		} else if (wasEnabled && !patchesEnabled) {
			resetRenamerRuntimeState();
		}
	});
	void startRuntimeBootstrap();

	const MainPage: React.FC = () => {
		const location = useLocation();
		const match = PluginApi.libraries.ReactRouterDOM.useRouteMatch();
		const { error: toastError } = PluginApi.hooks.useToast();
		const shouldRenderPage = !(match && !match.isExact);

		let currentTab = "editor";
		if (location.pathname.endsWith("/results")) currentTab = "results";
		if (location.pathname.endsWith("/settings")) currentTab = "settings";

		React.useEffect(() => {
			setActiveTabState(currentTab as any);
		}, [currentTab]);
		const [globalTaskOverlay, setGlobalTaskOverlay] = React.useState(() =>
			getRenamerTaskOverlayState(),
		);
		const [runtimeState, setRuntimeState] = React.useState(() =>
			getRuntimeBootstrapState(),
		);
		const lastToastRef = React.useRef("");

		React.useEffect(() => {
			const unsub = subscribeRenamerTaskOverlayState((payload) => {
				setGlobalTaskOverlay(payload);
			});
			return () => unsub();
		}, []);
		React.useEffect(
			() => subscribeRuntimeBootstrap((state) => setRuntimeState(state)),
			[],
		);
		React.useEffect(() => {
			const message = String(runtimeState.error || "").trim();
			if (!message || message === lastToastRef.current) return;
			lastToastRef.current = message;
			toastError(`Stashero runtime initialization failed: ${message}`);
		}, [runtimeState.error, toastError]);

		const pageRef = React.useRef<HTMLDivElement | null>(null);
		const componentsToLoad = [
			PluginApi.loadableComponents.Scenes,
			PluginApi.loadableComponents.Scene,
			PluginApi.loadableComponents.SceneDetailPanel,
			PluginApi.loadableComponents.SceneList,
			PluginApi.loadableComponents.SceneQueryModal,
		];
		const _componentsLoading =
			PluginApi.hooks.useLoadComponents(componentsToLoad);

		React.useEffect(() => {
			ensureSceneRenamerStyles();
		}, []);

		React.useLayoutEffect(() => {
			const pageEl = pageRef.current;
			if (!pageEl) return;
			const navEl = pageEl.querySelector(
				"#stash-renamer-tabs",
			) as HTMLElement | null;
			if (!navEl) return;

			const update = () => {
				const h = Math.ceil(navEl.getBoundingClientRect().height || 46);
				pageEl.style.setProperty("--sr-tabs-height", `${h}px`);
			};
			update();

			if (typeof window.ResizeObserver !== "undefined") {
				const ro = new window.ResizeObserver(update);
				ro.observe(navEl);
				return () => ro.disconnect();
			}

			window.addEventListener("resize", update);
			return () => window.removeEventListener("resize", update);
		}, [currentTab]);

		return (
			<>
				{!shouldRenderPage ? null : (
					<div ref={pageRef} className="stash-renamer-page">
						{runtimeState.done && runtimeState.error ? (
							<div className="alert alert-danger mx-2 mt-2" role="alert">
								Runtime initialization failed: {runtimeState.error}
							</div>
						) : null}
						{runtimeState.done ? (
							<Nav
								variant="tabs"
								className="mb-3"
								id="stash-renamer-tabs"
								activeKey={currentTab}
							>
								<Nav.Item>
									<Nav.Link
										as={NavLink}
										exact
										to="/plugins/stashero"
										eventKey="editor"
									>
										Editor
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link
										as={NavLink}
										to="/plugins/stashero/results"
										eventKey="results"
									>
										Results
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link
										as={NavLink}
										to="/plugins/stashero/settings"
										eventKey="settings"
									>
										Settings
									</Nav.Link>
								</Nav.Item>
							</Nav>
						) : null}
						<div className="pt-10 position-relative">
							<Switch>
								<Route exact path="/plugins/stashero">
									<EditorView />
								</Route>
								<Route path="/plugins/stashero/results">
									<RenamerResults />
								</Route>
								<Route path="/plugins/stashero/settings">
									<SettingsView />
								</Route>
							</Switch>
							<TaskProgressOverlay
								show={Boolean(globalTaskOverlay?.show)}
								progress={Number(globalTaskOverlay?.progress || 0)}
								text={String(globalTaskOverlay?.text || "")}
							/>
							<TaskProgressOverlay
								show={!runtimeState.done || runtimeState.overlay.show}
								progress={Number(runtimeState.overlay.progress || 0)}
								text={
									runtimeState.overlay.text || "Preparing Stashero runtime..."
								}
							/>
						</div>
					</div>
				)}
			</>
		);
	};

	PluginApi.register.route("/plugins/stashero", MainPage);
	PluginApi.register.route("/plugins/stashero/results", MainPage);
	PluginApi.register.route("/plugins/stashero/settings", MainPage);

	PluginApi.patch.before("MainNavBar.UtilityItems", (props: any) => {
		const { Icon } = PluginApi.components;
		return [
			{
				children: (
					<>
						{props.children}
						<NavLink className="nav-utility" exact to="/plugins/stashero">
							<Button
								className="minimal d-flex align-items-center h-100"
								title="Stashero"
							>
								<Icon icon={faEthernet} />
							</Button>
						</NavLink>
					</>
				),
			},
		];
	});

	PluginApi.patch.instead(
		"PluginSettings",
		(props: any, _: any, Original: any) => {
			if (props.pluginID !== "stashero") return <Original {...props} />;
			const { Setting } = PluginApi.components;

			return [
				<Setting
					key="stash-renamer-hook-setting"
					heading={<SettingsView className="w-100" />}
					subHeading=""
				/>,
			];
		},
	);
})();
