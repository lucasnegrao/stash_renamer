import { SortDirectionEnum } from "src/core/generated-graphql";
import { ListFilterModel } from "src/models/list-filter/filter";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { ButtonToolbar, ButtonGroup, Button, Badge, Form } =
	PluginApi.libraries.Bootstrap;
const { useIntl } = PluginApi.libraries.Intl;
const { Icon } = PluginApi.components;
const { faFilter, faCaretDown, faCaretUp, faRandom } =
	PluginApi.libraries.FontAwesomeSolid;

interface IFilteredListToolbarProps {
	filter: ListFilterModel;
	onSetFilter: (next: ListFilterModel) => void;
	onEditFilter: () => void;
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

export const FilteredListToolbar: React.FC<IFilteredListToolbarProps> = ({
	filter,
	onSetFilter,
	onEditFilter,
}) => {
	const intl = useIntl();
	const sortByOptions = filter.options.sortByOptions || [];
	const currentSortBy = sortByOptions.find(
		(o: any) => o.value === filter.sortBy,
	);

	return (
		<ButtonToolbar className="filtered-list-toolbar">
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

			<ButtonGroup>
				<Form.Control
					as="select"
					className="btn-secondary"
					value={filter.sortBy || ""}
					onChange={(e: any) => {
						onSetFilter(
							filter.setSortBy(String(e.target.value || "") || undefined),
						);
					}}
				>
					{sortByOptions.map((option: any) => (
						<option key={String(option.value)} value={String(option.value)}>
							{labelForSortOption(intl, option)}
						</option>
					))}
				</Form.Control>
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
			</ButtonGroup>

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
		</ButtonToolbar>
	);
};
