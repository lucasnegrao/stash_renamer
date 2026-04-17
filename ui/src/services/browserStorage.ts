const STORAGE_NAMESPACE = "stash_renamer";

function buildKey(key: string): string {
	return `${STORAGE_NAMESPACE}:${key}`;
}

export function loadFromLocalStorage<T>(key: string, fallback: T): T {
	try {
		const raw = window.localStorage.getItem(buildKey(key));
		if (raw == null) return fallback;
		return JSON.parse(raw) as T;
	} catch {
		return fallback;
	}
}

export function saveToLocalStorage<T>(key: string, value: T): boolean {
	try {
		window.localStorage.setItem(buildKey(key), JSON.stringify(value));
		return true;
	} catch {
		return false;
	}
}

export function removeFromLocalStorage(key: string): boolean {
	try {
		window.localStorage.removeItem(buildKey(key));
		return true;
	} catch {
		return false;
	}
}
