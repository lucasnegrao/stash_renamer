import { CriterionModifier } from "src/core/generated-graphql";
import { ModifierCriterion } from "src/models/list-filter/criteria/criterion";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, Form } = PluginApi.libraries.Bootstrap;
const { useIntl } = PluginApi.libraries.Intl;

const defaultOptions = [
	CriterionModifier.IsNull,
	CriterionModifier.NotNull,
	CriterionModifier.Equals,
	CriterionModifier.NotEquals,
	CriterionModifier.Includes,
	CriterionModifier.Excludes,
	CriterionModifier.GreaterThan,
	CriterionModifier.LessThan,
	CriterionModifier.Between,
	CriterionModifier.NotBetween,
];

interface IModifierSelect {
	options?: CriterionModifier[];
	value: CriterionModifier;
	onChanged: (m: CriterionModifier) => void;
}

export const ModifierSelectorButtons: React.FC<IModifierSelect> = ({
	options = defaultOptions,
	value,
	onChanged,
}) => {
	const intl = useIntl();

	return (
		<Form.Group className="modifier-options">
			{options.map((modifier) => (
				<Button
					className={`modifier-option ${value === modifier ? "selected" : ""}`}
					key={modifier}
					onClick={() => onChanged(modifier)}
				>
					{ModifierCriterion.getModifierLabel(intl, modifier)}
				</Button>
			))}
		</Form.Group>
	);
};
export const ModifierSelect: React.FC<IModifierSelect> = ({
	options = defaultOptions,
	value,
	onChanged,
}) => {
	const intl = useIntl();

	return (
		<Form.Control
			as="select"
			onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
				onChanged(e.target.value as CriterionModifier)
			}
			value={value}
			className="btn-secondary modifier-selector"
		>
			{options.map((m) => (
				<option key={m} value={m}>
					{ModifierCriterion.getModifierLabel(intl, m)}
				</option>
			))}
		</Form.Control>
	);
};
