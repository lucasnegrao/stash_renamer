import type { IWatchdogConfig } from "../../services/sceneRenamerApi";
import { FolderSelect } from "../list/Filters/FolderFilter";
import { BooleanOptionField } from "../list/columns/BooleanOptionField";
import {
	WATCHDOG_OPERATIONS,
	defaultInputForOperation,
	operationByMutation,
	type IWatchdogOperationDef,
	type IWatchdogOperationOptionDef,
} from "./watchdogOperations";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Modal, Form, Button, Spinner } = PluginApi.libraries.Bootstrap;

interface IEditableWatchdogConfig extends Partial<IWatchdogConfig> {
	options?: any;
}

interface IWatchdogOperationModalProps {
	show: boolean;
	saving?: boolean;
	fixedPath?: string | null;
	initialConfig?: IEditableWatchdogConfig | null;
	onHide: () => void;
	onSave: (payload: any) => Promise<void>;
}

function cloneValue<T>(value: T): T {
	try {
		return JSON.parse(JSON.stringify(value));
	} catch {
		return value;
	}
}

function toEnabled(value: unknown, fallback = false): boolean {
	if (value === undefined || value === null) return fallback;
	return (
		value === true ||
		value === 1 ||
		value === "1" ||
		String(value || "").toLowerCase() === "true"
	);
}

function buildInitialDraft(
	initialConfig: IEditableWatchdogConfig | null | undefined,
	fixedPath: string | null | undefined,
): IEditableWatchdogConfig {
	const base = initialConfig
		? cloneValue(initialConfig)
		: {
				enabled: true,
				path: fixedPath || "",
			};

	const operation = operationByMutation(String(base.operation || ""));
	const currentInput = base.options?.variables?.input;
	const nextInput =
		currentInput && typeof currentInput === "object"
			? cloneValue(currentInput)
			: defaultInputForOperation(operation);

	return {
		...base,
		path: fixedPath || String(base.path || ""),
		operation: operation.mutation,
		options: {
			...(base.options || {}),
			variables: {
				...(base.options?.variables || {}),
				input: nextInput,
			},
		},
	};
}

export const WatchdogOperationModal: React.FC<IWatchdogOperationModalProps> = ({
	show,
	saving = false,
	fixedPath = null,
	initialConfig = null,
	onHide,
	onSave,
}) => {
	const [draft, setDraft] = React.useState<IEditableWatchdogConfig>({});

	React.useEffect(() => {
		if (!show) return;
		setDraft(buildInitialDraft(initialConfig, fixedPath));
	}, [show, initialConfig, fixedPath]);

	const operation = operationByMutation(String(draft.operation || ""));
	const input = draft.options?.variables?.input || {};

	const setInputValue = (optionId: string, nextValue: unknown) => {
		setDraft((prev: any) => {
			const prevInput = prev?.options?.variables?.input || {};
			return {
				...prev,
				options: {
					...(prev.options || {}),
					variables: {
						...(prev.options?.variables || {}),
						input: {
							...prevInput,
							[optionId]: nextValue,
						},
					},
				},
			};
		});
	};

	const onOperationChange = (operationId: string) => {
		const nextOperation = WATCHDOG_OPERATIONS.find(
			(row) => row.id === operationId,
		);
		if (!nextOperation) return;
		setDraft((prev: any) => ({
			...prev,
			operation: nextOperation.mutation,
			options: {
				...(prev.options || {}),
				variables: {
					...(prev.options?.variables || {}),
					input: defaultInputForOperation(nextOperation),
				},
			},
		}));
	};

	const renderOptionField = (
		option: IWatchdogOperationOptionDef,
		parentOperation: IWatchdogOperationDef,
	) => {
		const value = input[option.id];
		const Renderer = option.component;
		if (Renderer) {
			return (
				<div key={`${parentOperation.id}:${option.id}`} className="mb-2">
					<Renderer
						label={option.label}
						value={value}
						disabled={saving}
						option={option}
						onChange={(nextValue: unknown) =>
							setInputValue(option.id, nextValue)
						}
					/>
				</div>
			);
		}
		if (option.type === "boolean") {
			return (
				<BooleanOptionField
					key={`${parentOperation.id}:${option.id}`}
					label={option.label}
					checked={toEnabled(value, false)}
					disabled={saving}
					onChange={(nextValue) => setInputValue(option.id, nextValue)}
				/>
			);
		}
		return (
			<Form.Group key={`${parentOperation.id}:${option.id}`} className="mb-2">
				<Form.Label>{option.label}</Form.Label>
				<Form.Control
					type="text"
					value={String(value ?? "")}
					disabled={saving}
					onChange={(e: any) =>
						setInputValue(option.id, e?.currentTarget?.value)
					}
				/>
			</Form.Group>
		);
	};

	const save = async () => {
		const path = String(draft.path || "").trim();
		if (!path) return;

		const existingInput = draft.options?.variables?.input || {};
		const payload = {
			id: draft.id,
			path,
			operation: String(draft.operation || operation.mutation),
			enabled: toEnabled(draft.enabled, true),
			options: {
				...(draft.options || {}),
				variables: {
					...(draft.options?.variables || {}),
					input: {
						...existingInput,
						paths: [path],
					},
				},
			},
		};
		await onSave(payload);
	};

	return (
		<Modal show={show} onHide={onHide} size="lg">
			<Modal.Header closeButton>
				<Modal.Title>
					{draft.id ? "Edit Operation" : "New Operation"}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className="mb-3">
					<Form.Label>Target Path</Form.Label>
					{fixedPath ? (
						<Form.Control
							type="text"
							value={String(draft.path || "")}
							readOnly
							disabled
						/>
					) : (
						<FolderSelect
							value={String(draft.path || "")}
							onChange={(value: string) =>
								setDraft((prev: any) => ({ ...prev, path: value }))
							}
						/>
					)}
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Operation Type</Form.Label>
					<Form.Control
						as="select"
						disabled={saving}
						value={operation.id}
						onChange={(e: any) =>
							onOperationChange(String(e?.currentTarget?.value))
						}
					>
						{WATCHDOG_OPERATIONS.map((item) => (
							<option key={item.id} value={item.id}>
								{item.label}
							</option>
						))}
					</Form.Control>
				</Form.Group>

				<BooleanOptionField
					label="Enabled"
					checked={toEnabled(draft.enabled, true)}
					disabled={saving}
					onChange={(nextValue) =>
						setDraft((prev: any) => ({ ...prev, enabled: nextValue }))
					}
				/>

				<hr />
				{operation.options.map((option) =>
					renderOptionField(option, operation),
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onHide} disabled={saving}>
					Cancel
				</Button>
				<Button
					variant="primary"
					disabled={!String(draft.path || "").trim() || saving}
					onClick={save}
				>
					{saving ? <Spinner size="sm" animation="border" /> : "Save"}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
