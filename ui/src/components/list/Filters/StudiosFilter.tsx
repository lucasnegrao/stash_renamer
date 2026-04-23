import type React from "react";
import { type ReactNode, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import {
	type StudioDataFragment,
	type StudioFilterType,
	useFindStudiosForSelectQuery,
} from "src/core/generated-graphql";
import type { CriterionOption } from "src/models/list-filter/criteria/criterion";
import {
	type StudiosCriterion,
	StudiosCriterionOption,
} from "src/models/list-filter/criteria/studios";
import type { ListFilterModel } from "src/models/list-filter/filter";
import { sortByRelevance } from "src/utils/query";
import {
	type IUseQueryHookProps,
	makeQueryVariables,
	setObjectFilter,
	useLabeledIdFilterState,
} from "./LabeledIdFilter";
import { HierarchicalObjectsFilter } from "./SelectableFilter";
import { SidebarListFilter } from "./SidebarListFilter";

interface IStudiosFilter {
	criterion: StudiosCriterion;
	setCriterion: (c: StudiosCriterion) => void;
}

function queryVariables(query: string, f?: ListFilterModel) {
	const studioFilter: StudioFilterType = {};

	if (f) {
		const filterOutput = f.makeFilter();

		// always remove studio filter from the filter
		// since modifier is includes
		delete filterOutput.studios;

		// TODO - look for same in AND?

		setObjectFilter(studioFilter, f.mode, filterOutput);
	}

	return makeQueryVariables(query, { studio_filter: studioFilter });
}

function sortResults(
	query: string,
	studios: Pick<StudioDataFragment, "id" | "name" | "aliases">[],
) {
	return sortByRelevance(
		query,
		studios ?? [],
		(s) => s.name,
		(s) => s.aliases,
	).map((p) => {
		return {
			id: p.id,
			label: p.name,
		};
	});
}

function useStudioQueryFilter(props: IUseQueryHookProps) {
	const { q: query, filter: f, skip, filterHook } = props;
	const appliedFilter = filterHook && f ? filterHook(f.clone()) : f;

	const { data, loading } = useFindStudiosForSelectQuery({
		variables: queryVariables(query, appliedFilter),
		skip,
	});

	const results = useMemo(
		() => sortResults(query, data?.findStudios.studios ?? []),
		[data?.findStudios.studios, query],
	);

	return { results, loading };
}

function useStudioQuery(query: string, skip?: boolean) {
	return useStudioQueryFilter({ q: query, skip: !!skip });
}

const StudiosFilter: React.FC<IStudiosFilter> = ({
	criterion,
	setCriterion,
}) => {
	return (
		<HierarchicalObjectsFilter
			criterion={criterion}
			setCriterion={setCriterion}
			useResults={useStudioQuery}
			singleValue
		/>
	);
};

export const SidebarStudiosFilter: React.FC<{
	title?: ReactNode;
	option?: CriterionOption;
	filter: ListFilterModel;
	setFilter: (f: ListFilterModel) => void;
	filterHook?: (f: ListFilterModel) => ListFilterModel;
	sectionID?: string;
}> = ({
	title = <FormattedMessage id="studios" />,
	option = StudiosCriterionOption,
	filter,
	setFilter,
	filterHook,
	sectionID = "studios",
}) => {
	const state = useLabeledIdFilterState({
		filter,
		setFilter,
		filterHook,
		option,
		useQuery: useStudioQueryFilter,
		singleValue: true,
		hierarchical: true,
		includeSubMessageID: "subsidiary_studios",
	});

	return (
		<SidebarListFilter
			{...state}
			data-type={option.type}
			title={title}
			sectionID={sectionID}
		/>
	);
};

export default StudiosFilter;
