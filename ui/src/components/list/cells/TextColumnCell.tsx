import cx from "classnames";

const PluginApi = window.PluginApi;
const React = PluginApi.React;

interface ITextColumnCellProps {
	value?: React.ReactNode;
	className?: string;
	placeholder?: React.ReactNode;
}

export const TextColumnCell: React.FC<ITextColumnCellProps> = ({
	value,
	className,
	placeholder = "-",
}) => {
	return <span className={cx(className)}>{value ?? placeholder}</span>;
};
