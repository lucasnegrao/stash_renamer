import {
	DUPLICATION_FIELD_IDS,
	DUPLICATION_FIELD_MESSAGE_IDS,
	type DuplicatedCriterion,
	type DuplicationFieldId,
} from "src/models/list-filter/criteria/phash";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Form } = PluginApi.libraries.Bootstrap;
const { useIntl } = PluginApi.libraries.Intl;

interface IDuplicatedFilterProps {
	criterion: DuplicatedCriterion;
	setCriterion: (c: DuplicatedCriterion) => void;
}

export const DuplicatedFilter: React.FC<IDuplicatedFilterProps> = ({
	criterion,
	setCriterion,
}) => {
	const intl = useIntl();

	function onFieldChange(fieldId: DuplicationFieldId, raw: string) {
		const next = criterion.clone();
		if (raw === "any") {
			delete next.value[fieldId];
		} else {
			next.value[fieldId] = raw === "true";
		}
		setCriterion(next);
	}

	return (
		<div className="duplicated-filter">
			{DUPLICATION_FIELD_IDS.map((fieldId) => {
				const rawValue = criterion.value[fieldId];
				const selectValue =
					typeof rawValue === "boolean" ? (rawValue ? "true" : "false") : "any";
				return (
					<Form.Group key={fieldId}>
						<Form.Label>
							{intl.formatMessage({
								id: DUPLICATION_FIELD_MESSAGE_IDS[fieldId],
							})}
						</Form.Label>
						<Form.Control
							as="select"
							value={selectValue}
							onChange={(e: any) =>
								onFieldChange(fieldId, String(e.target.value || "any"))
							}
						>
							<option value="any">any</option>
							<option value="true">true</option>
							<option value="false">false</option>
						</Form.Control>
					</Form.Group>
				);
			})}
		</div>
	);
};
