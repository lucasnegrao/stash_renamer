import type {
	DropdownIndicatorProps,
	OnChangeValue,
	OptionProps,
} from "react-select";

type Option = { value: string; label: string };

type DisableOption = Option & {
	isDisabled?: boolean;
	className?: string;
};

interface ICheckBoxSelectProps {
	options: DisableOption[];
	selectedOptions?: DisableOption[];
	onChange: (item: OnChangeValue<DisableOption, true>) => void;
}

export const CheckBoxSelect: React.FC<ICheckBoxSelectProps> = ({
	options,
	selectedOptions,
	onChange,
}) => {
	const PluginApi = window.PluginApi;
	const reactSelectComponents = PluginApi.libraries.ReactSelect.components;
	const React = PluginApi.React;
	const Select = PluginApi.libraries.ReactSelect.default;
	const Icon = PluginApi.components.Icon;
	const { faTableColumns } = PluginApi.libraries.FontAwesomeSolid;

	const Option = (props: OptionProps<DisableOption, true>) => (
		<reactSelectComponents.Option
			{...props}
			className={`${props.className || ""} ${props.data.className || ""}`}
			// data values don't seem to be included in props.innerProps by default
			innerProps={
				{
					...props.innerProps,
					"data-value": props.data.value,
				} as React.DetailedHTMLProps<
					React.HTMLAttributes<HTMLDivElement>,
					HTMLDivElement
				>
			}
		>
			<input
				type="checkbox"
				disabled={props.isDisabled}
				checked={props.isSelected}
				onChange={() => null}
				className="mr-1"
			/>
			<label>{props.label}</label>
		</reactSelectComponents.Option>
	);

	const DropdownIndicator = (
		props: DropdownIndicatorProps<DisableOption, true>,
	) => (
		<reactSelectComponents.DropdownIndicator {...props}>
			<Icon icon={faTableColumns} className="column-select" />
		</reactSelectComponents.DropdownIndicator>
	);

	return (
		<Select
			className="CheckBoxSelect"
			options={options}
			value={selectedOptions}
			isMulti
			closeMenuOnSelect={false}
			hideSelectedOptions={false}
			isSearchable={false}
			isClearable={false}
			components={{
				DropdownIndicator,
				Option,
				ValueContainer: () => null,
				IndicatorSeparator: () => null,
			}}
			onChange={onChange}
			styles={{
				control: (base: any) => ({
					...base,
					height: "25px",
					width: "25px",
					backgroundColor: "none",
					border: "none",
					transition: "none",
					cursor: "pointer",
				}),
				dropdownIndicator: (base: any) => ({
					...base,
					color: "rgb(255, 255, 255)",
					padding: "0",
				}),
				menu: (base: any) => ({
					...base,
					backgroundColor: "rgb(57, 75, 89)",
				}),
				option: (base: any, fprops: any) => ({
					...base,
					backgroundColor: fprops.isFocused
						? "rgb(37, 49, 58)"
						: "rgb(57, 75, 89)",
					padding: "0px 12px",
				}),
				menuList: (base: any) => ({
					...base,
					position: "fixed",
				}),
			}}
		/>
	);
};
