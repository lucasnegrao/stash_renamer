const PluginApi = window.PluginApi;
const React = PluginApi.React;

import { EditorView, basicSetup } from "codemirror";
import { liquid } from "@codemirror/lang-liquid";
import { oneDark } from "@codemirror/theme-one-dark";
import type { Completion } from "@codemirror/autocomplete";
import type { ITokenTreeNode } from "../services/sceneRenamerApi";

interface Props {
	value: string;
	onChange: (value: string) => void;
	tokenTree: ITokenTreeNode[];
	singleLine?: boolean;
}

const PATH_TOKEN_RE =
	/[A-Za-z_]\w*(?:\[[^\]]+\]|\.[A-Za-z_]\w*|\.\[[^\]]+\])*/g;

function normalizePath(path: string): string {
	return String(path || "")
		.trim()
		.replace(/\[[^\]]+\]/g, "")
		.replace(/\.\./g, ".");
}

function extractOutputExpressions(tree: ITokenTreeNode[]): string[] {
	const out = new Set<string>();

	const walk = (nodes: ITokenTreeNode[]) => {
		for (const node of nodes || []) {
			const token = String(node?.token || "").trim();

			const m = token.match(/^\{\{\s*(.+?)\s*\}\}$/);
			if (m?.[1]) {
				const raw = String(m[1]).split("|")[0].trim();
				const normalized = normalizePath(raw);
				if (normalized) out.add(normalized);
			}

			if (Array.isArray(node?.children) && node.children.length > 0) {
				walk(node.children);
			}
		}
	};

	walk(tree || []);
	return Array.from(out);
}

function buildCompletionIndex(paths: string[]) {
	const roots = new Set<string>();
	const childrenByPath = new Map<string, Set<string>>();

	for (const rawPath of paths) {
		const path = normalizePath(rawPath);
		if (!path) continue;

		const parts = path.split(".").filter(Boolean);
		if (!parts.length) continue;

		roots.add(parts[0]);

		for (let i = 0; i < parts.length - 1; i++) {
			const parent = parts.slice(0, i + 1).join(".");
			const child = parts[i + 1];

			if (!childrenByPath.has(parent)) {
				childrenByPath.set(parent, new Set());
			}
			childrenByPath.get(parent)!.add(child);
		}
	}

	return { roots, childrenByPath };
}

function makeLiquidConfig(tokenTree: ITokenTreeNode[]) {
	const paths = extractOutputExpressions(tokenTree);
	const { roots, childrenByPath } = buildCompletionIndex(paths);

	const variables: Completion[] = Array.from(roots).map((name) => ({
		label: name,
		type: "variable",
	}));

	return {
		variables,
		properties(path: readonly string[]) {
			const joined = path.join(".");
			const children = childrenByPath.get(joined);
			if (!children) return [];

			return Array.from(children).map((name) => ({
				label: name,
				type: "property",
			}));
		},
	};
}

export function TemplateCodeEditor({
	value,
	onChange,
	tokenTree,
	singleLine,
}: Props) {
	const containerRef = React.useRef<HTMLDivElement | null>(null);
	const viewRef = React.useRef<EditorView | null>(null);

	const liquidConfig = React.useMemo(() => {
		return makeLiquidConfig(tokenTree || []);
	}, [tokenTree]);

	React.useEffect(() => {
		if (!containerRef.current) return;
		const fixedHeightEditor = EditorView.theme({
			"&": { height: "400px" },
			".cm-scroller": { overflow: "auto" },
		});
		var view: EditorView;
		if (!singleLine)
			view = new EditorView({
				parent: containerRef.current,
				doc: value || "",
				extensions: [
					basicSetup,
					liquid(liquidConfig),
					oneDark,
					fixedHeightEditor,
					EditorView.lineWrapping,
					EditorView.updateListener.of((update) => {
						if (update.docChanged) {
							onChange(update.state.doc.toString());
						}
					}),
				],
			});
		else
			view = new EditorView({
				parent: containerRef.current,
				doc: value || "",
				extensions: [
					basicSetup,
					liquid(liquidConfig),
					oneDark,
					EditorView.updateListener.of((update) => {
						if (update.docChanged) {
							onChange(update.state.doc.toString());
						}
					}),
				],
			});

		viewRef.current = view;

		return () => {
			view.destroy();
			viewRef.current = null;
		};
	}, [liquidConfig]);

	React.useEffect(() => {
		const view = viewRef.current;
		if (!view) return;

		const current = view.state.doc.toString();
		if (current === value) return;

		view.dispatch({
			changes: { from: 0, to: current.length, insert: value || "" },
		});
	}, [value]);

	return <div ref={containerRef} />;
}
