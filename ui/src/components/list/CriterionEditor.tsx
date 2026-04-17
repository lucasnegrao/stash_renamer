import { CriterionModifier } from "../../core/generated-graphql";
import {
	BooleanCriterion,
	Criterion,
	CriterionValue,
	DateCriterion,
	DurationCriterion,
	ModifierCriterion,
	NumberCriterion,
	TimestampCriterion,
} from "src/models/list-filter/criteria/criterion";
import { FolderCriterion } from "src/models/list-filter/criteria/folder";
import {
	criterionIsDateValue,
	criterionIsNumberValue,
	criterionIsStashIDValue,
	criterionIsTimestampValue,
} from "src/models/list-filter/types";
import { DuplicatedCriterion } from "src/models/list-filter/criteria/phash";
import { PathCriterion } from "src/models/list-filter/criteria/path";
import { CustomFieldsCriterion } from "src/models/list-filter/criteria/custom-fields";
import { RatingCriterion } from "src/models/list-filter/criteria/rating";
import { StashIDCriterion } from "src/models/list-filter/criteria/stash-ids";

import { BooleanFilter } from "./Filters/BooleanFilter";
import { DateFilter } from "./Filters/DateFilter";
import { DuplicatedFilter } from "./Filters/DuplicateFilter";
import { DurationFilter } from "./Filters/DurationFilter";
import { InputFilter } from "./Filters/InputFilter";
import { NumberFilter } from "./Filters/NumberFilter";
import { OptionFilter, OptionListFilter } from "./Filters/OptionFilter";
import { ObjectFilter } from "./Filters/ObjectFilter";
import { PathFilter } from "./Filters/PathFilter";
import { RatingFilter } from "./Filters/RatingFilter";
import { StashIDFilter } from "./Filters/StashIDFilter";
import { TimestampFilter } from "./Filters/TimestampFilter";
import { ModifierSelectorButtons } from "./ModifierSelect";
import { FolderFilter } from "./Filters/FolderFilter";
import { CustomFieldsFilter } from "./Filters/CustomFieldsFilter";

const PluginApi = window.PluginApi;
const React = PluginApi.React;

interface ICriterionEditorProps {
	criterion: Criterion;
	setCriterion: (c: Criterion) => void;
}

interface IGenericCriterionEditorProps {
	criterion: ModifierCriterion<CriterionValue>;
	setCriterion: (c: ModifierCriterion<CriterionValue>) => void;
}

const GenericCriterionEditor: React.FC<IGenericCriterionEditorProps> = ({
	criterion,
	setCriterion,
}) => {
	console.log(criterion);
	const { options, modifierOptions, inputType } =
		criterion.modifierCriterionOption();

	const onChangedModifierSelect = React.useCallback(
		(modifier: CriterionModifier) => {
			const next = criterion.clone();
			next.modifier = modifier;
			setCriterion(next);
		},
		[criterion, setCriterion],
	);

	const onValueChanged = React.useCallback(
		(value: any) => {
			const next = criterion.clone();
			next.value = value;
			setCriterion(next);
		},
		[criterion, setCriterion],
	);

	const shouldHideValue =
		criterion.modifier === CriterionModifier.IsNull ||
		criterion.modifier === CriterionModifier.NotNull;

	const modifierSelector =
		modifierOptions && modifierOptions.length > 0 ? (
			<ModifierSelectorButtons
				options={modifierOptions}
				value={criterion.modifier}
				onChanged={onChangedModifierSelect}
			/>
		) : null;

	if (shouldHideValue && !(criterion instanceof StashIDCriterion)) {
		return <>{modifierSelector}</>;
	}

	let valueControl: React.ReactNode = null;
	const isObjectInputType = [
		"performers",
		"studios",
		"tags",
		"performer_tags",
		"scene_tags",
		"groups",
		"galleries",
		"scenes",
	].includes(String(inputType || ""));

	if (criterion instanceof PathCriterion) {
		valueControl = (
			<PathFilter criterion={criterion} onValueChanged={onValueChanged} />
		);
	} else if (isObjectInputType) {
		valueControl = (
			<ObjectFilter criterion={criterion} onValueChanged={onValueChanged} />
		);
	} else if (
		criterion instanceof StashIDCriterion ||
		criterionIsStashIDValue(criterion.value)
	) {
		valueControl = (
			<StashIDFilter
				criterion={criterion as any}
				onValueChanged={onValueChanged}
			/>
		);
	} else if (criterion instanceof DateCriterion) {
		valueControl = (
			<DateFilter
				criterion={criterion as any}
				onValueChanged={onValueChanged}
			/>
		);
	} else if (criterion instanceof TimestampCriterion) {
		valueControl = (
			<TimestampFilter
				criterion={criterion as any}
				onValueChanged={onValueChanged}
			/>
		);
	} else if (criterion instanceof DurationCriterion) {
		valueControl = (
			<DurationFilter
				criterion={criterion as any}
				onValueChanged={onValueChanged}
			/>
		);
	} else if (criterion instanceof RatingCriterion) {
		valueControl = (
			<RatingFilter
				criterion={criterion as any}
				onValueChanged={onValueChanged}
			/>
		);
	} else if (criterion instanceof NumberCriterion) {
		valueControl = (
			<NumberFilter
				criterion={criterion as any}
				onValueChanged={onValueChanged}
			/>
		);
	} else if (criterion instanceof FolderCriterion) {
		valueControl = (
			<FolderFilter criterion={criterion as any} setCriterion={setCriterion} />
		);
	} else if (
		Array.isArray(options) &&
		options.length > 0 &&
		Array.isArray(criterion.value)
	) {
		valueControl = (
			<OptionListFilter criterion={criterion} setCriterion={setCriterion} />
		);
	} else if (Array.isArray(options) && options.length > 0) {
		valueControl = (
			<OptionFilter criterion={criterion} setCriterion={setCriterion} />
		);
	} else {
		valueControl = (
			<InputFilter criterion={criterion} onValueChanged={onValueChanged} />
		);
	}

	return (
		<div>
			{modifierSelector}
			{valueControl}
		</div>
	);
};

export const CriterionEditor: React.FC<ICriterionEditorProps> = ({
	criterion,
	setCriterion,
}) => {
	if (criterion instanceof BooleanCriterion) {
		return (
			<div className="criterion-editor">
				<BooleanFilter
					criterion={criterion}
					setCriterion={setCriterion as any}
				/>
			</div>
		);
	}

	if (criterion instanceof DuplicatedCriterion) {
		return (
			<div className="criterion-editor">
				<DuplicatedFilter
					criterion={criterion}
					setCriterion={setCriterion as any}
				/>
			</div>
		);
	}

	// Keep custom-fields usable via generic JSON/text editing for now.
	if (criterion instanceof CustomFieldsCriterion) {
		return (
			<CustomFieldsFilter criterion={criterion} setCriterion={setCriterion} />
		);
	}

	if (criterion instanceof ModifierCriterion) {
		return (
			<div className="criterion-editor">
				<GenericCriterionEditor
					criterion={criterion}
					setCriterion={setCriterion as any}
				/>
			</div>
		);
	}

	return (
		<div className="criterion-editor text-muted">
			Unsupported criterion type.
		</div>
	);
};
