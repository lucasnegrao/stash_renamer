import {
	faChevronDown,
	faChevronRight,
	faChevronUp,
	type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, Collapse } = PluginApi.libraries.Bootstrap;
const { Icon } = PluginApi.components;

interface IProps {
	className?: string;
	text: React.ReactNode;
	collapseProps?: any;
	outsideCollapse?: React.ReactNode;
	onOpenChanged?: (o: boolean) => void;
	open?: boolean;
}

export const CollapseButton: React.FC<React.PropsWithChildren<IProps>> = (
	props: React.PropsWithChildren<IProps>,
) => {
	const { useEffect, useState } = React;
	const [open, setOpen] = useState(props.open ?? false);

	function toggleOpen() {
		const nv = !open;
		setOpen(nv);
		props.onOpenChanged?.(nv);
	}

	useEffect(() => {
		if (props.open !== undefined) {
			setOpen(props.open);
		}
	}, [props.open]);

	return (
		<div className={props.className}>
			<div className="collapse-header">
				<Button
					onClick={() => toggleOpen()}
					className="minimal collapse-button sr-collapse-button"
				>
					<Icon icon={open ? faChevronDown : faChevronRight} fixedWidth />
					<span className="sr-collapse-button-label">{props.text}</span>
				</Button>
			</div>
			{props.outsideCollapse}
			<Collapse in={open} {...props.collapseProps}>
				<div>{props.children}</div>
			</Collapse>
		</div>
	);
};

export const ExpandCollapseButton: React.FC<{
	collapsed: boolean;
	setCollapsed: (collapsed: boolean) => void;
	collapsedIcon?: IconDefinition;
	notCollapsedIcon?: IconDefinition;
}> = ({ collapsedIcon, notCollapsedIcon, collapsed, setCollapsed }) => {
	const buttonIcon = collapsed
		? (collapsedIcon ?? faChevronDown)
		: (notCollapsedIcon ?? faChevronUp);

	return (
		<span className="detail-expand-collapse">
			<Button
				className="minimal expand-collapse"
				onClick={(e: any) => {
					setCollapsed(!collapsed);
					e.stopPropagation();
				}}
			>
				<Icon icon={buttonIcon} fixedWidth />
			</Button>
		</span>
	);
};
