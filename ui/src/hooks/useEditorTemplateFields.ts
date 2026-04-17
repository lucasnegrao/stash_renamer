import {
	loadFromLocalStorage,
	saveToLocalStorage,
} from "../services/browserStorage";
import {
	applyFilterToSceneList,
	getFilterState,
	hasSceneListSetFilterState,
	setFilterState,
	subscribeSceneRuntimeState,
} from "../services/renamerRuntimeState";

const PluginApi = window.PluginApi;
const React = PluginApi.React;

const TEMPLATE_STORAGE_KEY = "editor:filename_template";
const PATH_TEMPLATE_STORAGE_KEY = "editor:path_template";
const FILTER_STORAGE_KEY = "editor:scene_filter";
const DEFAULT_TEMPLATE = "$scene.studio.name - $scene.date - $scene.title";

export function useEditorTemplateFields() {
	const [template, setTemplate] = React.useState(() =>
		loadFromLocalStorage<string>(TEMPLATE_STORAGE_KEY, DEFAULT_TEMPLATE),
	);
	const [pathTemplate, setPathTemplate] = React.useState(() =>
		loadFromLocalStorage<string>(PATH_TEMPLATE_STORAGE_KEY, ""),
	);
	const [debouncedTemplate, setDebouncedTemplate] = React.useState(template);
	const [debouncedPathTemplate, setDebouncedPathTemplate] =
		React.useState(pathTemplate);
	const [sceneRuntimeToken, setSceneRuntimeToken] = React.useState(0);
	const templateInputRef = React.useRef<HTMLInputElement | null>(null);
	const pathTemplateInputRef = React.useRef<HTMLInputElement | null>(null);
	const restoredFilterPendingRef = React.useRef(false);

	React.useEffect(() => {
		const unsub = subscribeSceneRuntimeState(({ token }) =>
			setSceneRuntimeToken(token),
		);
		return () => unsub();
	}, []);

	React.useEffect(() => {
		const timeout = window.setTimeout(
			() => setDebouncedTemplate(template),
			350,
		);
		return () => window.clearTimeout(timeout);
	}, [template]);

	React.useEffect(() => {
		const timeout = window.setTimeout(
			() => setDebouncedPathTemplate(pathTemplate),
			350,
		);
		return () => window.clearTimeout(timeout);
	}, [pathTemplate]);

	React.useEffect(() => {
		saveToLocalStorage(TEMPLATE_STORAGE_KEY, template);
	}, [template]);

	React.useEffect(() => {
		saveToLocalStorage(PATH_TEMPLATE_STORAGE_KEY, pathTemplate);
	}, [pathTemplate]);

	React.useEffect(() => {
		const savedFilter = loadFromLocalStorage<unknown | null>(
			FILTER_STORAGE_KEY,
			null,
		);
		if (!savedFilter || typeof savedFilter !== "object") return;
		setFilterState(savedFilter);
		restoredFilterPendingRef.current = !applyFilterToSceneList(savedFilter);
	}, []);

	React.useEffect(() => {
		if (!restoredFilterPendingRef.current) return;
		if (!hasSceneListSetFilterState()) return;
		const currentFilter = getFilterState();
		if (!currentFilter) {
			restoredFilterPendingRef.current = false;
			return;
		}
		if (applyFilterToSceneList(currentFilter)) {
			restoredFilterPendingRef.current = false;
		}
	}, [sceneRuntimeToken]);

	React.useEffect(() => {
		saveToLocalStorage(FILTER_STORAGE_KEY, getFilterState());
	}, [sceneRuntimeToken]);

	const insertTokenInInput = (
		ref: React.RefObject<HTMLInputElement | null>,
		value: string,
		setValue: (next: string) => void,
		token: string,
	) => {
		const input = ref.current;
		if (!input) {
			setValue(`${value}${token}`);
			return;
		}
		const start = input.selectionStart ?? value.length;
		const end = input.selectionEnd ?? start;
		const nextValue = `${value.slice(0, start)}${token}${value.slice(end)}`;
		setValue(nextValue);
		const cursor = start + token.length;
		window.requestAnimationFrame(() => {
			input.focus();
			input.setSelectionRange(cursor, cursor);
		});
	};

	const handleDropOnInput =
		(field: "filename" | "path") =>
		(event: React.DragEvent<HTMLInputElement>) => {
			event.preventDefault();
			const token = event.dataTransfer.getData("text/plain");
			if (!token) return;
			if (field === "path") {
				insertTokenInInput(
					pathTemplateInputRef,
					pathTemplate,
					setPathTemplate,
					token,
				);
			} else {
				insertTokenInInput(templateInputRef, template, setTemplate, token);
			}
		};

	return {
		template,
		setTemplate,
		pathTemplate,
		setPathTemplate,
		debouncedTemplate,
		debouncedPathTemplate,
		sceneRuntimeToken,
		templateInputRef,
		pathTemplateInputRef,
		handleDropOnInput,
	};
}
