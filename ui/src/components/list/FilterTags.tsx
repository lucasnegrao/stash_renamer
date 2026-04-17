import {
	Criterion,
	UnsupportedCriterion,
} from "src/models/list-filter/criteria/criterion";
import { CustomFieldsCriterion } from "src/models/list-filter/criteria/custom-fields";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Badge, Button } = PluginApi.libraries.Bootstrap;
const { useIntl } = PluginApi.libraries.Intl;
const Icon = PluginApi.components?.Icon;
const { faExclamationTriangle, faMagnifyingGlass, faTimes } =
	PluginApi.libraries.FontAwesomeSolid;

export const TagItem: React.FC<{
	className?: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
	children: React.ReactNode;
}> = ({ className, onClick, children }) => {
	return (
		<Badge
			className={`tag-item ${className || ""}`}
			variant="secondary"
			onClick={onClick}
		>
			{children}
		</Badge>
	);
};

export const FilterTag: React.FC<{
	className?: string;
	label: React.ReactNode;
	onClick: React.MouseEventHandler<HTMLElement>;
	onRemove: React.MouseEventHandler<HTMLElement>;
	unsupported?: boolean;
}> = ({ className, label, onClick, onRemove, unsupported = false }) => {
	function handleClick(e: React.MouseEvent<HTMLElement>) {
		if (unsupported) return;
		onClick(e);
	}

	return (
		<TagItem
			className={`${className || ""} ${unsupported ? "unsupported" : ""}`}
			onClick={handleClick}
		>
			{unsupported && Icon && faExclamationTriangle ? (
				<Icon icon={faExclamationTriangle} className="unsupported-icon mr-1" />
			) : null}
			{label}
			<Button
				variant="secondary"
				size="sm"
				className="ml-2"
				onClick={(e: any) => {
					onRemove(e);
					e.stopPropagation();
				}}
			>
				{Icon && faTimes ? <Icon icon={faTimes} /> : "x"}
			</Button>
		</TagItem>
	);
};

interface IFilterTagsProps {
	searchTerm?: string;
	criteria: Criterion[];
	onEditSearchTerm?: () => void;
	onEditCriterion: (c: Criterion) => void;
	onRemoveCriterion: (c: Criterion, valueIndex?: number) => void;
	onRemoveAll: () => void;
	onRemoveSearchTerm?: () => void;
}

export const FilterTags: React.FC<IFilterTagsProps> = ({
	searchTerm,
	criteria,
	onEditCriterion,
	onRemoveCriterion,
	onRemoveAll,
	onEditSearchTerm,
	onRemoveSearchTerm,
}) => {
	const intl = useIntl();

	function onRemoveCriterionTag(
		criterion: Criterion,
		event: React.MouseEvent<HTMLElement>,
		valueIndex?: number,
	) {
		onRemoveCriterion(criterion, valueIndex);
		event.stopPropagation();
	}

	function getCriterionTags(criterion: Criterion): React.ReactNode[] {
		if (
			criterion instanceof CustomFieldsCriterion &&
			Array.isArray(criterion.value) &&
			criterion.value.length > 1
		) {
			return criterion.value.map((value, index) => (
				<FilterTag
					key={`${criterion.getId()}-${index}`}
					label={criterion.getValueLabel(intl, value)}
					onClick={() => onEditCriterion(criterion)}
					onRemove={(e) => onRemoveCriterionTag(criterion, e, index)}
				/>
			));
		}

		const unsupported = criterion instanceof UnsupportedCriterion;
		return [
			<FilterTag
				key={criterion.getId()}
				label={criterion.getLabel(intl)}
				unsupported={unsupported}
				onClick={() => onEditCriterion(criterion)}
				onRemove={(e) => onRemoveCriterionTag(criterion, e)}
			/>,
		];
	}

	const tags = criteria.flatMap((c) => getCriterionTags(c));

	if (searchTerm && searchTerm.length > 0) {
		tags.unshift(
			<FilterTag
				key="search-term"
				className="search-term-filter-tag"
				label={
					<span className="search-term">
						{Icon && faMagnifyingGlass ? (
							<Icon icon={faMagnifyingGlass} className="mr-1" />
						) : null}
						{searchTerm}
					</span>
				}
				onClick={() => onEditSearchTerm?.()}
				onRemove={(e) => {
					e.stopPropagation();
					onRemoveSearchTerm?.();
				}}
			/>,
		);
	}

	if (tags.length === 0) return null;

	return (
		<div className="wrap-tags filter-tags">
			{tags}
			<Button
				className="clear-all-button"
				variant="secondary"
				onClick={onRemoveAll}
			>
				{intl.formatMessage({ id: "actions.clear" })}
			</Button>
		</div>
	);
};
