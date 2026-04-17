import {
	CriterionValue,
	ModifierCriterion,
} from "src/models/list-filter/criteria/criterion";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Form } = PluginApi.libraries.Bootstrap;

interface IPathFilterProps {
	criterion: ModifierCriterion<CriterionValue>;
	onValueChanged: (value: string) => void;
}

export const PathFilter: React.FC<IPathFilterProps> = ({
	criterion,
	onValueChanged,
}) => {
	const configuration = PluginApi.utils.StashService.useConfiguration();
	console.log(configuration);
	const libraryPaths = configuration?.data?.configuration?.general?.stashes.map(
		(s: any) => s.path,
	);
	console.log(libraryPaths);
	const FolderSelect = PluginApi.components.FolderSelect;

	// don't show folder select for regex
	//   const regex =
	//     criterion.modifier === CriterionModifier.MatchesRegex ||
	//     criterion.modifier === CriterionModifier.NotMatchesRegex;

	return (
		<Form.Group>
			{/* { ? (
				<Form.Control
					className="btn-secondary"
					type={criterion.modifierCriterionOption().inputType}
					onChange={(v) => onValueChanged(v.target.value)}
					value={criterion.value ? criterion.value.toString() : ""}
				/>
			) : ( */}
			<FolderSelect
				currentDirectory={criterion.value ? criterion.value.toString() : ""}
				onChangeDirectory={onValueChanged}
				collapsible
				quotePath
				hideError
				defaultDirectories={libraryPaths}
			/>
			{/* )} */}
		</Form.Group>
	);
};
