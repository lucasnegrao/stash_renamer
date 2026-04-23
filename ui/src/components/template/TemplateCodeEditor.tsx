const PluginApi = window.PluginApi;
const React = PluginApi.React;

import type { Completion } from "@codemirror/autocomplete";
import {
	autocompletion,
	closeBrackets,
	closeBracketsKeymap,
	completionKeymap,
} from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { liquid } from "@codemirror/lang-liquid";
import {
	bracketMatching,
	defaultHighlightStyle,
	HighlightStyle,
	indentOnInput,
	syntaxHighlighting,
} from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import {
	crosshairCursor,
	drawSelection,
	dropCursor,
	EditorView,
	highlightActiveLine,
	highlightSpecialChars,
	keymap,
	placeholder as placeholderExtension,
	rectangularSelection,
} from "@codemirror/view";
import { tags as t } from "@lezer/highlight";
import type { ITokenTreeNode } from "../../api/sceneRenamerApi";

export interface ITemplateCodeEditorHandle {
	insertTokenAtCursor: (token: string) => void;
}

interface Props {
	value: string;
	onChange: (value: string) => void;
	tokenTree?: ITokenTreeNode[];
	singleLine?: boolean;
	lineNumbers?: boolean;
	className?: string;
	style?: React.CSSProperties;
	disabled?: boolean;
	placeholder?: string;
	onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
	onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	onEnter?: () => void;
	onReady?: (handle: ITemplateCodeEditorHandle) => void;
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

export const TemplateCodeEditor = React.forwardRef<
	ITemplateCodeEditorHandle,
	Props
>(
	(
		{
			value,
			onChange,
			tokenTree,
			singleLine,
			className,
			style,
			disabled,
			placeholder,
			onDragOver,
			onDrop,
			onFocus,
			onBlur,
			onEnter,
			onReady,
		},
		ref,
	) => {
		const containerRef = React.useRef<HTMLDivElement | null>(null);
		const viewRef = React.useRef<EditorView | null>(null);

		const onChangeRef = React.useRef(onChange);
		React.useEffect(() => {
			onChangeRef.current = onChange;
		}, [onChange]);

		const onBlurRef = React.useRef(onBlur);
		React.useEffect(() => {
			onBlurRef.current = onBlur;
		}, [onBlur]);

		const onEnterRef = React.useRef(onEnter);
		React.useEffect(() => {
			onEnterRef.current = onEnter;
		}, [onEnter]);

		const displayValue = singleLine
			? (value || "").replace(/[\r\n]+/g, "")
			: value || "";
		const lastNotifiedValue = React.useRef(displayValue);

		const liquidConfig = React.useMemo(() => {
			return makeLiquidConfig(tokenTree || []);
		}, [tokenTree]);

		const getEditorHandle = React.useCallback(
			(): ITemplateCodeEditorHandle => ({
				insertTokenAtCursor: (token: string) => {
					const view = viewRef.current;
					if (!view) return;
					const { state } = view;
					const selection = state.selection.main;
					view.dispatch({
						changes: { from: selection.from, to: selection.to, insert: token },
						selection: { anchor: selection.from + token.length },
						scrollIntoView: true,
					});
					view.focus();
				},
			}),
			[],
		);

		React.useImperativeHandle(ref, () => getEditorHandle());

		React.useEffect(() => {
			if (onReady) {
				onReady(getEditorHandle());
			}
		}, [onReady, getEditorHandle]);

		React.useEffect(() => {
			if (!containerRef.current) return;

			const customSetup = [
				highlightSpecialChars(),
				history(),
				drawSelection(),
				dropCursor(),
				EditorState.allowMultipleSelections.of(true),
				indentOnInput(),
				syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
				bracketMatching(),
				closeBrackets(),
				autocompletion(),
				rectangularSelection(),
				crosshairCursor(),
				highlightActiveLine(),
				EditorView.domEventHandlers({
					blur: () => {
						if (onBlurRef.current) onBlurRef.current();
						return false;
					},
				}),
				keymap.of([
					...closeBracketsKeymap,
					...defaultKeymap,
					...historyKeymap,
					...completionKeymap,
				]),
			];

			const baseExtensions = [
				...customSetup,
				liquid(liquidConfig),
				oneDark,
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						const newDoc = update.state.doc.toString();
						lastNotifiedValue.current = newDoc;
						onChangeRef.current(newDoc);
					}
				}),
				syntaxHighlighting(
					HighlightStyle.define([
						{ tag: t.content, color: "white", fontWeight: "bold" },
						{ tag: t.brace, color: "#abb2bf", fontWeight: "normal" },
						{ tag: t.bracket, color: "#abb2bf", fontWeight: "normal" },
					]),
				),
			];

			if (placeholder) {
				baseExtensions.push(placeholderExtension(placeholder));
			}

			if (disabled) {
				baseExtensions.push(
					EditorView.editable.of(false),
					EditorView.theme({
						"&": { opacity: 0.6, cursor: "not-allowed" },
						".cm-content": { cursor: "not-allowed" },
					}),
				);
			}

			const multiLineTheme = EditorView.theme({
				"&": { height: "400px" },
				".cm-scroller": { overflow: "auto" },
			});

			const singleLineTheme = EditorView.theme({
				"&": {
					backgroundColor: "transparent",
					flex: 1,
					width: "100%",
				},
				"&.cm-focused": {
					outline: "none",
				},
				".cm-scroller": {
					overflowX: "auto",
					overflowY: "hidden",
					whiteSpace: "pre",
					scrollbarWidth: "none",
				},
				".cm-scroller::-webkit-scrollbar": {
					display: "none",
				},
				".cm-content": {
					padding: 0,
					whiteSpace: "pre",
				},
				".cm-line": {
					padding: 0,
				},
			});

			const singleLineFilter = EditorState.transactionFilter.of((tr) => {
				if (tr.newDoc.lines > 1) {
					const text = tr.newDoc.toString().replace(/[\r\n]+/g, "");
					return {
						changes: { from: 0, to: tr.startState.doc.length, insert: text },
						selection: {
							anchor: Math.min(tr.newSelection.main.anchor, text.length),
						},
					};
				}
				return tr;
			});

			const singleLineKeymap = keymap.of([
				{
					key: "Enter",
					run: () => {
						if (onEnterRef.current) onEnterRef.current();
						return true;
					},
				},
				{ key: "Shift-Enter", run: () => true },
			]);

			const extensions = singleLine
				? [
						...baseExtensions,
						singleLineTheme,
						singleLineFilter,
						singleLineKeymap,
					]
				: [...baseExtensions, multiLineTheme, EditorView.lineWrapping];

			const view = new EditorView({
				parent: containerRef.current,
				doc: displayValue,
				extensions,
			});

			viewRef.current = view;

			return () => {
				view.destroy();
				viewRef.current = null;
			};
		}, [liquidConfig, singleLine, disabled, placeholder]);

		React.useEffect(() => {
			const view = viewRef.current;
			if (!view) return;

			const safeValue = singleLine
				? (value || "").replace(/[\r\n]+/g, "")
				: value || "";

			if (safeValue === lastNotifiedValue.current) return;

			const current = view.state.doc.toString();
			if (current === safeValue) return;

			view.dispatch({
				changes: { from: 0, to: current.length, insert: safeValue },
			});
			lastNotifiedValue.current = safeValue;
		}, [value, singleLine]);

		return (
			<div
				ref={containerRef}
				className={className}
				style={style}
				onDragOver={onDragOver}
				onDrop={onDrop}
				onFocus={onFocus}
			/>
		);
	},
);
