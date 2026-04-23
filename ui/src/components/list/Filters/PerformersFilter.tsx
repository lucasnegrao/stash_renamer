import type React from "react";
import { type ReactNode, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import {
	CriterionModifier,
	type FindPerformersForSelectQueryVariables,
	type PerformerDataFragment,
	type PerformerFilterType,
	useFindPerformersForSelectQuery,
} from "src/core/generated-graphql";
import type { CriterionOption } from "src/models/list-filter/criteria/criterion";
import {
	type PerformersCriterion,
	PerformersCriterionOption,
} from "src/models/list-filter/criteria/performers";
import type { ListFilterModel } from "src/models/list-filter/filter";
import { sortByRelevance } from "src/utils/query";
import {
	type IUseQueryHookProps,
	makeQueryVariables,
	setObjectFilter,
	useLabeledIdFilterState,
} from "./LabeledIdFilter";
import { ObjectsFilter } from "./SelectableFilter";
import { SidebarListFilter } from "./SidebarListFilter";

interface IPerformersFilter {
	criterion: PerformersCriterion;
	setCriterion: (c: PerformersCriterion) => void;
}

interface IHasModifier {
	modifier: CriterionModifier;
}

function queryVariables(
	query: string,
	f?: ListFilterModel,
): FindPerformersForSelectQueryVariables {
	const performerFilter: PerformerFilterType = {};

	if (f) {
		const filterOutput = f.makeFilter();

		// if performer modifier is includes, take it out of the filter
		if (
			(filterOutput.performers as IHasModifier)?.modifier ===
			CriterionModifier.Includes
		) {
			delete filterOutput.performers;

			// TODO - look for same in AND?
		}

		setObjectFilter(performerFilter, f.mode, filterOutput);
	}

	return makeQueryVariables(query, { performer_filter: performerFilter });
}

function sortResults(
	query: string,
	performers?: Pick<PerformerDataFragment, "name" | "alias_list" | "id">[],
) {
	return sortByRelevance(
		query,
		performers ?? [],
		(p) => p.name,
		(p) => p.alias_list,
	).map((p) => {
		return {
			id: p.id,
			label: p.name,
		};
	});
}

function usePerformerQueryFilter(props: IUseQueryHookProps) {
	const { q: query, filter: f, skip, filterHook } = props;
	const appliedFilter = filterHook && f ? filterHook(f.clone()) : f;

	const { data, loading } = useFindPerformersForSelectQuery({
		variables: queryVariables(query, appliedFilter),
		skip,
	});

	const results = useMemo(
		() => sortResults(query, data?.findPerformers.performers),
		[data, query],
	);

	return { results, loading };
}

function usePerformerQuery(query: string, skip?: boolean) {
	return usePerformerQueryFilter({ q: query, skip: !!skip });
}

const PerformersFilter: React.FC<IPerformersFilter> = ({
	criterion,
	setCriterion,
}) => {
	return (
		<ObjectsFilter
			criterion={criterion}
			setCriterion={setCriterion}
			useResults={usePerformerQuery}
		/>
	);
};

export const SidebarPerformersFilter: React.FC<{
	title?: ReactNode;
	option?: CriterionOption;
	filter: ListFilterModel;
	setFilter: (f: ListFilterModel) => void;
	filterHook?: (f: ListFilterModel) => ListFilterModel;
	sectionID?: string;
}> = ({
	title = <FormattedMessage id="performers" />,
	option = PerformersCriterionOption,
	filter,
	setFilter,
	filterHook,
	sectionID = "performers",
}) => {
	const state = useLabeledIdFilterState({
		filter,
		setFilter,
		filterHook,
		option,
		useQuery: usePerformerQueryFilter,
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

export default PerformersFilter;
