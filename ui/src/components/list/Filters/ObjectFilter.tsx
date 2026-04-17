import { FilterMode } from "src/core/generated-graphql";
import { ListFilterModel } from "src/models/list-filter/filter";
import {
	CriterionValue,
	ModifierCriterion,
} from "src/models/list-filter/criteria/criterion";
import {
	criterionIsHierarchicalLabelValue,
	ILabeledId,
} from "src/models/list-filter/types";
import { HierarchicalObjectsFilter, ObjectsFilter } from "./SelectableFilter";

const PluginApi = window.PluginApi;
const React = PluginApi.React;

type TObjectInputType =
	| "performers"
	| "studios"
	| "tags"
	| "performer_tags"
	| "scene_tags"
	| "groups"
	| "galleries"
	| "scenes";

interface IObjectFilterProps {
	criterion: ModifierCriterion<CriterionValue>;
	onValueChanged: (value: CriterionValue) => void;
}

function asInputType(value: unknown): TObjectInputType | undefined {
	const v = String(value || "")
		.trim()
		.toLowerCase();
	switch (v) {
		case "performers":
		case "studios":
		case "tags":
		case "performer_tags":
		case "scene_tags":
		case "groups":
		case "galleries":
		case "scenes":
			return v;
		default:
			return undefined;
	}
}

function modeForInputType(inputType: TObjectInputType): FilterMode {
	switch (inputType) {
		case "performers":
			return FilterMode.Performers;
		case "studios":
			return FilterMode.Studios;
		case "tags":
		case "performer_tags":
		case "scene_tags":
			return FilterMode.Tags;
		case "groups":
			return FilterMode.Groups;
		case "galleries":
			return FilterMode.Galleries;
		case "scenes":
			return FilterMode.Scenes;
	}
}

function buildFilter(mode: FilterMode, query: string): ListFilterModel {
	const f = new ListFilterModel(mode);
	f.searchTerm = query;
	f.currentPage = 1;
	f.itemsPerPage = 40;
	return f;
}

async function querySelectableObjects(
	inputType: TObjectInputType,
	query: string,
): Promise<ILabeledId[]> {
	const stash = PluginApi.utils.StashService;
	const filter = buildFilter(modeForInputType(inputType), query);

	switch (inputType) {
		case "performers": {
			const res = await stash.queryFindPerformersForSelect(filter);
			const rows = res?.data?.findPerformers?.performers ?? [];
			return rows.map((row: any) => ({
				id: String(row.id),
				label: String(row.name || "-"),
			}));
		}
		case "studios": {
			const res = await stash.queryFindStudiosForSelect(filter);
			const rows = res?.data?.findStudios?.studios ?? [];
			return rows.map((row: any) => ({
				id: String(row.id),
				label: String(row.name || "-"),
			}));
		}
		case "tags":
		case "performer_tags":
		case "scene_tags": {
			const res = await stash.queryFindTagsForSelect(filter);
			const rows = res?.data?.findTags?.tags ?? [];
			return rows.map((row: any) => ({
				id: String(row.id),
				label: String(row.name || "-"),
			}));
		}
		case "groups": {
			const res = await stash.queryFindGroupsForSelect(filter);
			const rows = res?.data?.findGroups?.groups ?? [];
			return rows.map((row: any) => ({
				id: String(row.id),
				label: String(row.name || "-"),
			}));
		}
		case "galleries": {
			const res = await stash.queryFindGalleriesForSelect(filter);
			const rows = res?.data?.findGalleries?.galleries ?? [];
			return rows.map((row: any) => ({
				id: String(row.id),
				label: String(row.title || row.code || row.id || "-"),
			}));
		}
		case "scenes": {
			const res = await stash.queryFindScenesForSelect(filter);
			const rows = res?.data?.findScenes?.scenes ?? [];
			return rows.map((row: any) => ({
				id: String(row.id),
				label: String(row.title || row.code || row.id || "-"),
			}));
		}
	}
}

function useObjectResults(
	inputType: TObjectInputType | undefined,
	query: string,
) {
	const [results, setResults] = React.useState<ILabeledId[]>([]);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		if (!inputType) {
			setResults([]);
			setLoading(false);
			return;
		}

		let active = true;
		setLoading(true);
		querySelectableObjects(inputType, query)
			.then((rows) => {
				if (!active) return;
				setResults(rows);
			})
			.catch((e) => {
				if (!active) return;
				console.error("[Scene Renamer] Object filter query failed", e);
				setResults([]);
			})
			.finally(() => {
				if (active) setLoading(false);
			});

		return () => {
			active = false;
		};
	}, [inputType, query]);

	return { results, loading };
}

export const ObjectFilter: React.FC<IObjectFilterProps> = ({
	criterion,
	onValueChanged,
}) => {
	const inputType = asInputType(criterion.modifierCriterionOption().inputType);

	const useResults = (query: string) => useObjectResults(inputType, query);

	if (!inputType) {
		return (
			<div className="text-muted">Unsupported object filter input type.</div>
		);
	}

	const isHierarchical = criterionIsHierarchicalLabelValue(criterion.value);
	const singleValue = inputType === "studios";

	const setCriterion = (next: ModifierCriterion<any>) =>
		onValueChanged(next.value);

	if (isHierarchical) {
		return (
			<HierarchicalObjectsFilter
				criterion={criterion as any}
				setCriterion={setCriterion as any}
				useResults={useResults}
				singleValue={singleValue}
			/>
		);
	}

	return (
		<ObjectsFilter
			criterion={criterion as any}
			setCriterion={setCriterion as any}
			useResults={useResults}
			singleValue={singleValue}
		/>
	);
};
