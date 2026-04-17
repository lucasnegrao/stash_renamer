import cx from "classnames";
const PluginApi = window.PluginApi;
const React = PluginApi.React;
type TagItemProps = React.PropsWithChildren<{
	className?: string;
	draggable?: boolean;
	style?: React.CSSProperties;
	onDragStart?: (event: any) => void;
}>;

export const TagItem: React.FC<TagItemProps> = (props: TagItemProps) => {
	const { Badge } = PluginApi.libraries.Bootstrap;
	const { className, children, ...others } = props;
	return (
		<Badge
			className={cx("tag-item", className)}
			variant="secondary"
			{...others}
		>
			{children}
		</Badge>
	);
};
