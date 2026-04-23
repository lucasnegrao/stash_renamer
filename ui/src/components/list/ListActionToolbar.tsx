import { SortDirectionEnum } from "src/core/generated-graphql";
import type { ListFilterModel } from "src/models/list-filter/filter";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { ButtonToolbar, ButtonGroup, Button, Badge, Form, Dropdown } =
	PluginApi.libraries.Bootstrap;
const { useIntl } = PluginApi.libraries.Intl;
const { Icon } = PluginApi.components;
const { faFilter, faCaretDown, faCaretUp, faRandom } =
	PluginApi.libraries.FontAwesomeSolid;

interface IListActionToolbarProps {
	filter: ListFilterModel;
	onSetFilter: (next: ListFilterModel) => void;
	onEditFilter: () => void;
	beforeContent?: React.ReactNode;
	afterContent?: React.ReactNode;
}

const PAGE_SIZE_OPTIONS = [20, 40, 60, 120, 250, 500, 1000];

function labelForSortOption(intl: any, option: any): string {
	const id = option?.messageID || option?.value || "";
	try {
		return intl.formatMessage({ id });
	} catch {
		return String(id || option?.value || "-");
	}
}

export const ListActionToolbar: React.FC<IListActionToolbarProps> = ({
	filter,
	onSetFilter,
	onEditFilter,
	beforeContent,
	afterContent,
}) => {
	const intl = useIntl();
	const sortByOptions = filter.options.sortByOptions || [];
	const currentSortBy = sortByOptions.find(
		(o: any) => o.value === filter.sortBy,
	);

	const sortedOptions = React.useMemo(() => {
		return [...sortByOptions].sort((a: any, b: any) => {
			const aLabel = labelForSortOption(intl, a);
			const bLabel = labelForSortOption(intl, b);
			return aLabel.localeCompare(bLabel);
		});
	}, [sortByOptions, intl]);

	return (
		<ButtonToolbar className="filtered-list-toolbar">
			{beforeContent}

			<ButtonGroup>
				<Button
					variant="secondary"
					className="filter-button"
					onClick={onEditFilter}
					title={intl.formatMessage({ id: "search_filter.edit_filter" })}
				>
					<Icon icon={faFilter} />
					{filter.count() > 0 ? (
						<Badge pill variant="info">
							{filter.count()}
						</Badge>
					) : null}
				</Button>
			</ButtonGroup>

			<Dropdown as={ButtonGroup} className="sort-by-select">
				<Dropdown.Toggle variant="secondary">
					{currentSortBy ? labelForSortOption(intl, currentSortBy) : ""}
				</Dropdown.Toggle>
				<Dropdown.Menu className="bg-secondary text-white">
					{sortedOptions.map((option: any) => (
						<Dropdown.Item
							key={String(option.value)}
							eventKey={String(option.value)}
							data-value={String(option.value)}
							className="bg-secondary text-white"
							onSelect={(eventKey: string | null) =>
								onSetFilter(filter.setSortBy(eventKey || undefined))
							}
						>
							{labelForSortOption(intl, option)}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
				<Button
					variant="secondary"
					title={intl.formatMessage({ id: "actions.sort" })}
					onClick={() => onSetFilter(filter.toggleSortDirection())}
				>
					<Icon
						icon={
							filter.sortDirection === SortDirectionEnum.Desc
								? faCaretDown
								: faCaretUp
						}
					/>
				</Button>
				{currentSortBy?.value === "random" ? (
					<Button
						variant="secondary"
						title={intl.formatMessage({ id: "actions.reshuffle" })}
						onClick={() => onSetFilter(filter.reshuffleRandomSort())}
					>
						<Icon icon={faRandom} />
					</Button>
				) : null}
			</Dropdown>

			<ButtonGroup>
				<Form.Control
					as="select"
					value={String(filter.itemsPerPage)}
					className="btn-secondary"
					onChange={(e: any) => {
						const next = Number(e.target.value || 40);
						onSetFilter(filter.setPageSize(next));
					}}
				>
					{PAGE_SIZE_OPTIONS.map((size) => (
						<option key={size} value={size}>
							{size}
						</option>
					))}
				</Form.Control>
			</ButtonGroup>

			{afterContent}
		</ButtonToolbar>
	);
};
