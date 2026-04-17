import { CriterionModifier } from "src/core/generated-graphql";
import { ModifierCriterion } from "src/models/list-filter/criteria/criterion";
import { IStashIDValue } from "src/models/list-filter/types";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Form } = PluginApi.libraries.Bootstrap;
const { useIntl } = PluginApi.libraries.Intl;

interface IStashIDFilterProps {
	criterion: ModifierCriterion<IStashIDValue>;
	onValueChanged: (value: IStashIDValue) => void;
}

export const StashIDFilter: React.FC<IStashIDFilterProps> = ({
	criterion,
	onValueChanged,
}) => {
	const intl = useIntl();
	const value = criterion.value || { endpoint: "", stashID: "" };

	return (
		<div>
			<Form.Group>
				<Form.Control
					className="btn-secondary"
					onChange={(event: any) =>
						onValueChanged({
							endpoint: String(event.target.value || ""),
							stashID: value.stashID || "",
						})
					}
					value={value.endpoint || ""}
					placeholder={intl.formatMessage({ id: "stash_id_endpoint" })}
				/>
			</Form.Group>
			{criterion.modifier !== CriterionModifier.IsNull &&
				criterion.modifier !== CriterionModifier.NotNull && (
					<Form.Group>
						<Form.Control
							className="btn-secondary"
							onChange={(event: any) =>
								onValueChanged({
									stashID: String(event.target.value || ""),
									endpoint: value.endpoint || "",
								})
							}
							value={value.stashID || ""}
							placeholder={intl.formatMessage({ id: "stash_id" })}
						/>
					</Form.Group>
				)}
		</div>
	);
};
