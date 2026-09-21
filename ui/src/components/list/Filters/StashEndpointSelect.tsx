import { CandidateList, type Option, SelectedList } from "./SidebarListFilter";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { useMemo, useCallback } = React;
const { Form } = PluginApi.libraries.Bootstrap;

interface IStashEndpointSelectProps {
	value?: string[];
	onChange: (endpoints: string[]) => void;
}

export const StashEndpointSelect: React.FC<IStashEndpointSelectProps> = ({
	value = [],
	onChange,
}) => {
	const configuration = PluginApi.utils.StashService.useConfiguration();
	const stashBoxes =
		configuration?.data?.configuration?.general?.stashBoxes || [];

	const onSelect = useCallback(
		(item: Option, exclude: boolean) => {
			if (exclude) return; // Stash endpoint selection doesn't support exclusion in this context
			if (value.includes(item.id)) return;
			onChange([...value, item.id]);
		},
		[value, onChange],
	);

	const onUnselect = useCallback(
		(item: Option) => {
			onChange(value.filter((v) => v !== item.id));
		},
		[value, onChange],
	);

	const selectedOptions: Option[] = useMemo(() => {
		return value.map((v) => {
			const box = stashBoxes.find((b: any) => b.endpoint === v);
			return {
				id: v,
				label: box ? box.name : v,
			};
		});
	}, [value, stashBoxes]);

	const candidateOptions: Option[] = useMemo(() => {
		return stashBoxes
			.filter((b: any) => !value.includes(b.endpoint))
			.map((b: any) => ({
				id: b.endpoint,
				label: b.name,
			}));
	}, [stashBoxes, value]);

	return (
		<div className="stash-endpoint-select">
			<Form.Group>
				<SelectedList items={selectedOptions} onUnselect={onUnselect} />
				<CandidateList
					items={candidateOptions}
					onSelect={onSelect}
					canExclude={false}
				/>
			</Form.Group>
		</div>
	);
};
