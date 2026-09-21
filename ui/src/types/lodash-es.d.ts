declare module "lodash-es" {
	export interface DebounceSettings {
		leading?: boolean;
		maxWait?: number;
		trailing?: boolean;
	}

	export interface DebouncedFunc<T extends (...args: any[]) => any> {
		(...args: Parameters<T>): ReturnType<T> | undefined;
		cancel(): void;
		flush(): ReturnType<T> | undefined;
	}

	export function debounce<T extends (...args: any[]) => any>(
		func: T,
		wait?: number,
		options?: DebounceSettings,
	): DebouncedFunc<T>;
}
