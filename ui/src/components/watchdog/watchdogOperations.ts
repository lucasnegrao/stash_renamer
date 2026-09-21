import { WatchdogEndpointSourcesOption } from "./WatchdogEndpointSourcesOption";

export const METADATA_SCAN_OP = `mutation metadataScan($input: ScanMetadataInput!) { metadataScan(input: $input) }`;
export const METADATA_IDENTIFY_OP = `mutation metadataIdentify($input: IdentifyMetadataInput!) { metadataIdentify(input: $input) }`;

export type WatchdogOperationOptionType = "boolean" | "text";

export interface IWatchdogOperationOptionDef {
	id: string;
	label: string;
	type: WatchdogOperationOptionType;
	defaultValue: unknown;
	component?: any;
}

export interface IWatchdogOperationDef {
	id: string;
	label: string;
	mutation: string;
	options: IWatchdogOperationOptionDef[];
}

export const WATCHDOG_OPERATIONS: IWatchdogOperationDef[] = [
	{
		id: "metadata_scan",
		label: "Metadata Scan",
		mutation: METADATA_SCAN_OP,
		options: [
			{ id: "rescan", label: "Rescan", type: "boolean", defaultValue: false },
			{
				id: "scanGenerateCovers",
				label: "Generate Covers",
				type: "boolean",
				defaultValue: false,
			},
			{
				id: "scanGeneratePreviews",
				label: "Generate Previews",
				type: "boolean",
				defaultValue: false,
			},
			{
				id: "scanGenerateImagePreviews",
				label: "Generate Image Previews",
				type: "boolean",
				defaultValue: false,
			},
			{
				id: "scanGenerateSprites",
				label: "Generate Sprites",
				type: "boolean",
				defaultValue: false,
			},
			{
				id: "scanGeneratePhashes",
				label: "Generate Phashes",
				type: "boolean",
				defaultValue: false,
			},
			{
				id: "scanGenerateImagePhashes",
				label: "Generate Image Phashes",
				type: "boolean",
				defaultValue: false,
			},
			{
				id: "scanGenerateThumbnails",
				label: "Generate Thumbnails",
				type: "boolean",
				defaultValue: false,
			},
			{
				id: "scanGenerateClipPreviews",
				label: "Generate Clip Previews",
				type: "boolean",
				defaultValue: false,
			},
		],
	},
	{
		id: "metadata_identify",
		label: "Metadata Identify",
		mutation: METADATA_IDENTIFY_OP,
		options: [
			{
				id: "sources",
				label: "Metadata Identify Endpoints",
				type: "text",
				defaultValue: [],
				component: WatchdogEndpointSourcesOption,
			},
		],
	},
];

export function operationByMutation(value: string): IWatchdogOperationDef {
	const match = WATCHDOG_OPERATIONS.find(
		(operation) => operation.mutation === String(value || ""),
	);
	return match || WATCHDOG_OPERATIONS[0];
}

export function operationById(value: string): IWatchdogOperationDef {
	const match = WATCHDOG_OPERATIONS.find(
		(operation) => operation.id === String(value || ""),
	);
	return match || WATCHDOG_OPERATIONS[0];
}

function cloneValue<T>(value: T): T {
	try {
		return JSON.parse(JSON.stringify(value));
	} catch {
		return value;
	}
}

export function defaultInputForOperation(
	operation: IWatchdogOperationDef,
): any {
	const out: Record<string, unknown> = {};
	(operation.options || []).forEach((option) => {
		out[option.id] = cloneValue(option.defaultValue);
	});
	return out;
}
