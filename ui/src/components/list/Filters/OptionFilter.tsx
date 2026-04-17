import {
	CriterionValue,
	ModifierCriterion,
} from "src/models/list-filter/criteria/criterion";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Form } = PluginApi.libraries.Bootstrap;

interface IOptionFilterProps {
	criterion: ModifierCriterion<CriterionValue>;
	setCriterion: (c: ModifierCriterion<CriterionValue>) => void;
}

export const OptionFilter: React.FC<IOptionFilterProps> = ({
	criterion,
	setCriterion,
}) => {
	const { options } = criterion.modifierCriterionOption();

	function onSelect(value: string) {
		const next = criterion.clone();
		next.value = next.value === value ? ("" as any) : (value as any);
		setCriterion(next);
	}

	return (
		<div className="option-list-filter">
			{options?.map((option) => {
				const value = String(option);
				return (
					<Form.Check
						id={`${criterion.getId()}-${value}`}
						key={value}
						onChange={() => onSelect(value)}
						checked={String(criterion.value ?? "") === value}
						type="radio"
						label={value}
					/>
				);
			})}
		</div>
	);
};

interface IOptionListFilterProps {
	criterion: ModifierCriterion<CriterionValue>;
	setCriterion: (c: ModifierCriterion<CriterionValue>) => void;
}

export const OptionListFilter: React.FC<IOptionListFilterProps> = ({
	criterion,
	setCriterion,
}) => {
	const { options } = criterion.modifierCriterionOption();
	const selected = Array.isArray(criterion.value)
		? (criterion.value as string[])
		: [];

	function onToggle(value: string) {
		const next = criterion.clone();
		const current = Array.isArray(next.value) ? (next.value as string[]) : [];
		next.value = current.includes(value)
			? (current.filter((v) => v !== value) as any)
			: ([...current, value] as any);
		setCriterion(next);
	}

	return (
		<div className="option-list-filter">
			{options?.map((option) => {
				const value = String(option);
				return (
					<Form.Check
						id={`${criterion.getId()}-${value}`}
						key={value}
						onChange={() => onToggle(value)}
						checked={selected.includes(value)}
						type="checkbox"
						label={value}
					/>
				);
			})}
		</div>
	);
};
