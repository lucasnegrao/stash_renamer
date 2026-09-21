import { CriterionModifier } from "src/core/generated-graphql";
import {
	IHierarchicalLabeledIdCriterion,
	type ModifierCriterion,
} from "src/models/list-filter/criteria/criterion";
import type {
	IHierarchicalLabelValue,
	ILabeledId,
	ILabeledValueListValue,
} from "src/models/list-filter/types";
import useFocus from "src/utils/focus";
import { keyboardClickHandler } from "src/utils/keyboard";
import ScreenUtils from "src/utils/screen";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, Form } = PluginApi.libraries.Bootstrap;
const { FormattedMessage, useIntl } = PluginApi.libraries.Intl;
const { Icon } = PluginApi.components;
const { faCheckCircle, faMinus, faPlus, faTimesCircle } =
	PluginApi.libraries.FontAwesomeSolid;

interface ISelectedItem {
	label: string;
	excluded?: boolean;
	onClick: () => void;
	modifier?: boolean;
}

const SelectedItem: React.FC<ISelectedItem> = ({
	label,
	excluded = false,
	onClick,
	modifier = false,
}) => {
	const iconClassName = excluded ? "exclude-icon" : "include-button";
	const spanClassName = excluded
		? "excluded-object-label"
		: "selected-object-label";

	return (
		<li className={`${modifier ? "modifier-object " : ""}selected-object`}>
			<a
				onClick={() => onClick()}
				onKeyDown={keyboardClickHandler(onClick)}
				tabIndex={0}
			>
				<div>
					<Icon
						className={`fa-fw ${iconClassName}`}
						icon={excluded ? faTimesCircle : faCheckCircle}
					/>
					<span className={spanClassName}>{label}</span>
				</div>
				<div></div>
			</a>
		</li>
	);
};

const UnselectedItem: React.FC<{
	onSelect: (exclude: boolean) => void;
	label: string;
	canExclude: boolean;
	modifier?: boolean;
}> = ({ onSelect, label, canExclude, modifier = false }) => {
	return (
		<li className={`${modifier ? "modifier-object " : ""}unselected-object`}>
			<a
				onClick={() => onSelect(false)}
				onKeyDown={keyboardClickHandler(() => onSelect(false))}
				tabIndex={0}
			>
				<div>
					<Icon className="fa-fw include-button" icon={faPlus} />
					<span className="unselected-object-label">{label}</span>
				</div>
				<div>
					{canExclude ? (
						<Button
							onClick={(e: any) => {
								e.stopPropagation();
								onSelect(true);
							}}
							onKeyDown={(e: any) => e.stopPropagation()}
							className="minimal exclude-button"
						>
							<span className="exclude-button-text">
								<FormattedMessage id="actions.exclude_lowercase" />
							</span>
							<Icon className="fa-fw exclude-icon" icon={faMinus} />
						</Button>
					) : null}
				</div>
			</a>
		</li>
	);
};

interface ISelectableFilter {
	query: string;
	onQueryChange: (query: string) => void;
	modifier: CriterionModifier;
	showModifierValues: boolean;
	inputFocus: ReturnType<typeof useFocus>;
	canExclude: boolean;
	queryResults: ILabeledId[];
	selected: ILabeledId[];
	excluded: ILabeledId[];
	onSelect: (value: ILabeledId, exclude: boolean) => void;
	onUnselect: (value: ILabeledId) => void;
	onSetModifier: (modifier: CriterionModifier) => void;
	singleValue?: boolean;
}

type SpecialValue = "any" | "none" | "any_of" | "only";

function modifierValueToModifier(key: SpecialValue): CriterionModifier {
	switch (key) {
		case "any":
			return CriterionModifier.NotNull;
		case "none":
			return CriterionModifier.IsNull;
		case "any_of":
			return CriterionModifier.Includes;
		case "only":
			return CriterionModifier.Equals;
	}
}

const SelectableFilterUI: React.FC<ISelectableFilter> = ({
	query,
	onQueryChange,
	modifier,
	showModifierValues,
	inputFocus,
	canExclude,
	queryResults,
	selected,
	excluded,
	onSelect,
	onUnselect,
	onSetModifier,
	singleValue,
}) => {
	const intl = useIntl();
	const [inputRef] = inputFocus;

	const objects = React.useMemo(() => {
		if (
			modifier === CriterionModifier.IsNull ||
			modifier === CriterionModifier.NotNull
		) {
			return [];
		}

		return queryResults.filter(
			(p) =>
				selected.find((s) => s.id === p.id) === undefined &&
				excluded.find((s) => s.id === p.id) === undefined,
		);
	}, [modifier, queryResults, selected, excluded]);

	const includingOnly = modifier === CriterionModifier.Equals;
	const excludingOnly =
		modifier === CriterionModifier.Excludes ||
		modifier === CriterionModifier.NotEquals;

	const modifierValues = React.useMemo(() => {
		return {
			any: modifier === CriterionModifier.NotNull,
			none: modifier === CriterionModifier.IsNull,
			any_of: !singleValue && modifier === CriterionModifier.Includes,
			only: !singleValue && modifier === CriterionModifier.Equals,
		};
	}, [modifier, singleValue]);

	const defaultModifier = React.useMemo(() => {
		if (singleValue) return CriterionModifier.Includes;
		return CriterionModifier.IncludesAll;
	}, [singleValue]);

	const availableModifierValues: Record<SpecialValue, boolean> =
		React.useMemo(() => {
			return {
				any:
					modifier === defaultModifier &&
					selected.length === 0 &&
					excluded.length === 0,
				none:
					modifier === defaultModifier &&
					selected.length === 0 &&
					excluded.length === 0,
				any_of:
					!singleValue && modifier === defaultModifier && selected.length > 1,
				only:
					!singleValue &&
					modifier === defaultModifier &&
					selected.length > 0 &&
					excluded.length === 0,
			};
		}, [singleValue, defaultModifier, modifier, selected, excluded]);

	function onEnter() {
		if (objects.length === 1) {
			onSelect(objects[0], false);
		}
	}

	return (
		<div className="selectable-filter">
			<div className="d-flex align-items-center">
				<Form.Control
					ref={inputRef as any}
					value={query}
					onChange={(e: any) => onQueryChange(String(e.target.value || ""))}
					onKeyDown={(e: any) => {
						if (e.key === "Enter") {
							e.preventDefault();
							onEnter();
						}
					}}
					placeholder={`${intl.formatMessage({ id: "actions.search" })}...`}
				/>
				{query ? (
					<Button
						variant="secondary"
						size="sm"
						className="ml-2"
						onClick={() => onQueryChange("")}
					>
						x
					</Button>
				) : null}
			</div>
			<ul>
				{Object.entries(modifierValues).map(([key, value]) => {
					if (!value) return null;
					return (
						<SelectedItem
							key={key}
							onClick={() => onSetModifier(defaultModifier)}
							label={`(${intl.formatMessage({ id: `criterion_modifier_values.${key}` })})`}
							modifier
						/>
					);
				})}
				{selected.map((p) => (
					<SelectedItem
						key={p.id}
						label={p.label}
						excluded={excludingOnly}
						onClick={() => onUnselect(p)}
					/>
				))}
				{excluded.map((p) => (
					<li key={p.id} className="excluded-object">
						<SelectedItem
							label={p.label}
							excluded
							onClick={() => onUnselect(p)}
						/>
					</li>
				))}
				{showModifierValues
					? Object.entries(availableModifierValues).map(([key, value]) => {
							if (!value) return null;
							return (
								<UnselectedItem
									key={key}
									onSelect={() =>
										onSetModifier(modifierValueToModifier(key as SpecialValue))
									}
									label={`(${intl.formatMessage({ id: `criterion_modifier_values.${key}` })})`}
									canExclude={false}
									modifier
								/>
							);
						})
					: null}
				{objects.map((p: ILabeledId) => (
					<UnselectedItem
						key={p.id}
						onSelect={(exclude) => onSelect(p, exclude)}
						label={p.label}
						canExclude={canExclude && !includingOnly && !excludingOnly}
					/>
				))}
			</ul>
		</div>
	);
};

interface IObjectsFilterProps {
	criterion: ModifierCriterion<any>;
	setCriterion: (criterion: ModifierCriterion<any>) => void;
	useResults: (query: string) => { results: ILabeledId[]; loading: boolean };
	singleValue?: boolean;
}

function hasItemsExcluded(
	value: any,
): value is ILabeledValueListValue | IHierarchicalLabelValue {
	return (
		typeof value === "object" &&
		value !== null &&
		Array.isArray(value.items) &&
		Array.isArray(value.excluded)
	);
}

function hasDepth(
	value: IHierarchicalLabelValue,
): value is IHierarchicalLabelValue {
	return hasItemsExcluded(value) && typeof value.depth === "number";
}

export const ObjectsFilter: React.FC<IObjectsFilterProps> = ({
	criterion,
	setCriterion,
	useResults,
	singleValue,
}) => {
	const [query, setQuery] = React.useState("");
	const [displayQuery, setDisplayQuery] = React.useState("");
	const inputFocus = useFocus();
	const [, setInputFocus] = inputFocus;

	React.useEffect(() => {
		const t = window.setTimeout(() => setQuery(displayQuery), 250);
		return () => window.clearTimeout(t);
	}, [displayQuery]);

	const { results, loading } = useResults(query);
	const [queryResults, setQueryResults] = React.useState<ILabeledId[]>([]);
	React.useEffect(() => {
		if (!loading) setQueryResults(results);
	}, [results, loading]);

	const selected = React.useMemo<ILabeledId[]>(() => {
		if (Array.isArray(criterion.value)) return criterion.value;
		if (hasItemsExcluded(criterion.value)) return criterion.value.items;
		return [];
	}, [criterion]);

	const excluded = React.useMemo<ILabeledId[]>(() => {
		if (hasItemsExcluded(criterion.value))
			return criterion.value.excluded || [];
		return [];
	}, [criterion]);

	function setSelectedExcluded(
		nextSelected: ILabeledId[],
		nextExcluded: ILabeledId[],
	) {
		const next = criterion.clone();
		if (Array.isArray(next.value)) {
			next.value = nextSelected;
		} else if (hasItemsExcluded(next.value)) {
			next.value = {
				...next.value,
				items: nextSelected,
				excluded: nextExcluded,
			};
		}
		setCriterion(next);
	}

	function onSelect(value: ILabeledId, newExclude: boolean) {
		const nextSelected = selected.filter((v: ILabeledId) => v.id !== value.id);
		const nextExcluded = excluded.filter((v: ILabeledId) => v.id !== value.id);

		if (newExclude && hasItemsExcluded(criterion.value)) {
			nextExcluded.push(value);
		} else {
			nextSelected.push(value);
		}

		setSelectedExcluded(nextSelected, nextExcluded);
		setDisplayQuery("");
		setQuery("");
		if (!ScreenUtils.isTouch()) setInputFocus();
	}

	function onUnselect(value: ILabeledId) {
		setSelectedExcluded(
			selected.filter((v: ILabeledId) => v.id !== value.id),
			excluded.filter((v: ILabeledId) => v.id !== value.id),
		);
		setInputFocus();
	}

	function onSetModifier(modifier: CriterionModifier) {
		const next = criterion.clone();
		next.modifier = modifier;
		setCriterion(next);
	}

	const sortedSelected = React.useMemo(
		() =>
			selected
				.slice()
				.sort((a: ILabeledId, b: ILabeledId) => a.label.localeCompare(b.label)),
		[selected],
	);
	const sortedExcluded = React.useMemo(
		() =>
			excluded
				.slice()
				.sort((a: ILabeledId, b: ILabeledId) => a.label.localeCompare(b.label)),
		[excluded],
	);

	const canExclude =
		hasItemsExcluded(criterion.value) &&
		criterion
			.modifierCriterionOption()
			.modifierOptions.find((m) => m === CriterionModifier.Excludes) ===
			undefined;

	return (
		<SelectableFilterUI
			query={displayQuery}
			onQueryChange={setDisplayQuery}
			modifier={criterion.modifier}
			showModifierValues={!query}
			inputFocus={inputFocus}
			canExclude={canExclude}
			selected={sortedSelected}
			queryResults={queryResults}
			onSelect={onSelect}
			onUnselect={onUnselect}
			excluded={sortedExcluded}
			onSetModifier={onSetModifier}
			singleValue={singleValue}
		/>
	);
};

export const DepthSelector: React.FC<{
	depth: number | undefined;
	onDepthChanged: (depth: number) => void;
	id: string;
	label?: React.ReactNode;
	placeholder?: string;
	disabled?: boolean;
}> = ({ depth, onDepthChanged, id, label, disabled, placeholder }) => {
	return (
		<Form.Group>
			<Form.Group>
				<Form.Check
					id={id}
					checked={depth !== 0}
					label={label}
					onChange={() => onDepthChanged(depth !== 0 ? 0 : -1)}
					disabled={disabled}
				/>
			</Form.Group>
			{depth !== 0 ? (
				<Form.Group>
					<Form.Control
						type="number"
						className="btn-secondary"
						placeholder={placeholder}
						onChange={(e: any) =>
							onDepthChanged(e.target.value ? parseInt(e.target.value, 10) : -1)
						}
						defaultValue={depth !== -1 ? depth : ""}
						min={1}
					/>
				</Form.Group>
			) : null}
		</Form.Group>
	);
};

export const HierarchicalObjectsFilter: React.FC<IObjectsFilterProps> = (
	props,
) => {
	const intl = useIntl();
	const { criterion, setCriterion } = props;

	const depth = hasDepth(criterion.value) ? criterion.value.depth : 0;

	function onDepthChanged(nextDepth: number) {
		if (!hasItemsExcluded(criterion.value)) return;
		const next = criterion.clone();
		next.value = { ...next.value, depth: nextDepth };
		setCriterion(next);
	}

	function includeID(): string {
		if (criterion.criterionOption.type === "studios")
			return "include-sub-studios";
		if (criterion.criterionOption.type === "children")
			return "include-parent-tags";
		return "include-sub-tags";
	}

	function includeMessageID(): string {
		if (criterion.criterionOption.type === "studios")
			return "include_sub_studios";
		if (criterion.criterionOption.type === "children")
			return "include_parent_tags";
		return "include_sub_tags";
	}

	return (
		<div>
			<DepthSelector
				depth={depth}
				onDepthChanged={onDepthChanged}
				id={includeID()}
				label={intl.formatMessage({ id: includeMessageID() })}
				placeholder={intl.formatMessage({
					id: "studio_depth",
					defaultMessage: "Levels (empty for all)",
				})}
			/>
			<ObjectsFilter {...props} />
		</div>
	);
};
