import cx from "classnames";
import type {
	Criterion,
	CriterionOption,
} from "src/models/list-filter/criteria/criterion";
import { getFilterOptions } from "src/models/list-filter/factory";
import type { ListFilterModel } from "src/models/list-filter/filter";
import type { CriterionType } from "src/models/list-filter/types";
import {
	loadFromLocalStorage,
	saveToLocalStorage,
} from "src/services/browserStorage";
import { CriterionEditor } from "./CriterionEditor";
import { FilterTags } from "./FilterTags";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Modal, Button, Form, Accordion, Card } = PluginApi.libraries.Bootstrap;
const { useIntl } = PluginApi.libraries.Intl;
const Icon = PluginApi.components?.Icon;
const { faChevronDown, faChevronRight, faTimes, faThumbtack } =
	PluginApi.libraries.FontAwesomeSolid;

interface ICriterionListProps {
	criteriaTypes: string[];
	currentCriterion?: Criterion;
	setCriterion: (c: Criterion) => void;
	criterionOptions: CriterionOption[];
	pinnedCriterionOptions: CriterionOption[];
	selected?: CriterionOption;
	optionSelected: (o?: CriterionOption) => void;
	onRemoveCriterion: (criterionType: string) => void;
	onTogglePin: (option: CriterionOption) => void;
}

function labelForOption(intl: any, option: CriterionOption): string {
	try {
		return intl.formatMessage({ id: option.messageID });
	} catch {
		return option.messageID || option.type;
	}
}

function normalizeMode(mode: unknown): string {
	return String(mode || "")
		.trim()
		.toUpperCase()
		.replace(/[\s-]+/g, "_");
}

function pinnedStorageKey(mode: unknown): string {
	return `edit_filter:pinned:${normalizeMode(mode)}`;
}

const CriterionOptionList: React.FC<ICriterionListProps> = ({
	criteriaTypes,
	currentCriterion,
	setCriterion,
	criterionOptions,
	pinnedCriterionOptions,
	selected,
	optionSelected,
	onRemoveCriterion,
	onTogglePin,
}) => {
	const intl = useIntl();

	function onSelect(k: string | null) {
		if (!k) {
			optionSelected(undefined);
			return;
		}

		const option =
			criterionOptions.find((c) => c.type === k) ||
			pinnedCriterionOptions.find((c) => c.type === k);
		if (option) {
			optionSelected(option);
		}
	}

	function removeClicked(ev: any, criterionType: string) {
		ev.stopPropagation();
		ev.preventDefault();
		onRemoveCriterion(criterionType);
	}

	function togglePin(ev: any, option: CriterionOption) {
		ev.stopPropagation();
		ev.preventDefault();
		onTogglePin(option);
	}

	function renderCard(option: CriterionOption, isPinned: boolean) {
		const type = option.type;
		const isActive = selected?.type === type;
		const inUse = criteriaTypes.some((t) => t === type);
		return (
			<Card key={type} data-type={type}>
				<Accordion.Toggle className="filter-item-header" eventKey={type}>
					<span className="mr-auto d-flex align-items-center">
						{Icon && faChevronRight && faChevronDown ? (
							<Icon
								className="collapse-icon fa-fw mr-2"
								icon={isActive ? faChevronDown : faChevronRight}
							/>
						) : (
							<span className="mr-2">{isActive ? "v" : ">"}</span>
						)}
						<span>{labelForOption(intl, option)}</span>
					</span>
					{inUse ? (
						<Button
							className="remove-criterion-button"
							variant="minimal"
							onClick={(e: any) => removeClicked(e, type)}
						>
							{Icon && faTimes ? <Icon icon={faTimes} /> : "x"}
						</Button>
					) : null}
					<Button
						className="pin-criterion-button"
						variant="minimal"
						onClick={(e: any) => togglePin(e, option)}
					>
						{Icon && faThumbtack ? (
							<Icon icon={faThumbtack} className={isPinned ? "" : "tilted"} />
						) : (
							"pin"
						)}
					</Button>
				</Accordion.Toggle>
				<Accordion.Collapse eventKey={type}>
					{isActive && currentCriterion ? (
						<Card.Body>
							<CriterionEditor
								criterion={currentCriterion}
								setCriterion={setCriterion}
							/>
						</Card.Body>
					) : (
						<Card.Body />
					)}
				</Accordion.Collapse>
			</Card>
		);
	}

	return (
		<Accordion
			className="criterion-list"
			activeKey={selected?.type}
			onSelect={onSelect}
		>
			{pinnedCriterionOptions.length > 0 ? (
				<>
					{pinnedCriterionOptions.map((option) => renderCard(option, true))}
					<div className="pinned-criterion-divider" />
				</>
			) : null}
			{criterionOptions.map((option) => renderCard(option, false))}
		</Accordion>
	);
};

interface IEditFilterProps {
	filter: ListFilterModel;
	editingCriterion?: string;
	onApply: (filter: ListFilterModel) => void;
	onCancel: () => void;
}

export const EditFilterDialog: React.FC<IEditFilterProps> = ({
	filter,
	editingCriterion,
	onApply,
	onCancel,
}) => {
	const intl = useIntl();
	const [searchValue, setSearchValue] = React.useState("");
	const [currentFilter, setCurrentFilter] = React.useState<ListFilterModel>(
		filter.clone(),
	);
	const [criterion, setCriterion] = React.useState<Criterion | undefined>();
	const [pinnedIDs, setPinnedIDs] = React.useState<string[]>(() =>
		loadFromLocalStorage<string[]>(pinnedStorageKey(filter.mode), []),
	);

	const criteria = currentFilter.criteria || [];
	const criteriaTypes = React.useMemo(
		() => criteria.map((c: Criterion) => c.criterionOption.type),
		[criteria],
	);

	React.useEffect(() => {
		setPinnedIDs(
			loadFromLocalStorage<string[]>(pinnedStorageKey(currentFilter.mode), []),
		);
	}, [currentFilter.mode]);

	const filterOptions = React.useMemo(
		() => getFilterOptions(currentFilter.mode),
		[currentFilter.mode],
	);

	const criterionOptions = React.useMemo(() => {
		return [...(filterOptions.criterionOptions || [])]
			.filter((c) => !c.hidden)
			.sort((a, b) =>
				labelForOption(intl, a).localeCompare(labelForOption(intl, b)),
			);
	}, [intl, filterOptions.criterionOptions]);

	const filteredOptions = React.useMemo(() => {
		const q = searchValue.trim().toLowerCase();
		if (!q) return criterionOptions;
		return criterionOptions.filter((option) =>
			labelForOption(intl, option).toLowerCase().includes(q),
		);
	}, [criterionOptions, intl, searchValue]);

	const pinnedOptions = React.useMemo(
		() => filteredOptions.filter((o) => pinnedIDs.includes(o.messageID)),
		[filteredOptions, pinnedIDs],
	);
	const unpinnedOptions = React.useMemo(
		() => filteredOptions.filter((o) => !pinnedIDs.includes(o.messageID)),
		[filteredOptions, pinnedIDs],
	);

	const optionSelected = React.useCallback(
		(option?: CriterionOption) => {
			if (!option) {
				setCriterion(undefined);
				return;
			}

			const existing = criteria.find(
				(c: Criterion) => c.criterionOption.type === option.type,
			);
			if (existing) {
				setCriterion(existing);
				return;
			}
			setCriterion(currentFilter.makeCriterion(option.type));
		},
		[criteria, currentFilter],
	);

	React.useEffect(() => {
		if (!editingCriterion) return;
		const option = criterionOptions.find(
			(c: CriterionOption) => c.type === editingCriterion,
		);
		if (option) optionSelected(option);
	}, [editingCriterion, criterionOptions, optionSelected]);

	function replaceCriterion(nextCriterion: Criterion) {
		const nextFilter = currentFilter.clone();
		const nextCriteria = [...criteria];
		const idx = nextCriteria.findIndex(
			(c) => c.criterionOption.type === nextCriterion.criterionOption.type,
		);

		if (!nextCriterion.isValid()) {
			if (idx >= 0) nextCriteria.splice(idx, 1);
		} else if (idx >= 0) {
			nextCriteria[idx] = nextCriterion;
		} else {
			nextCriteria.push(nextCriterion);
		}

		nextFilter.criteria = nextCriteria;
		setCurrentFilter(nextFilter);
		setCriterion(nextCriterion);
	}

	function removeCriterionByType(criterionType: string) {
		const nextFilter = currentFilter.clone();
		nextFilter.criteria = criteria.filter(
			(c: Criterion) => c.criterionOption.type !== criterionType,
		);
		setCurrentFilter(nextFilter);
		if (criterion?.criterionOption.type === criterionType) {
			setCriterion(undefined);
		}
	}

	function removeCriterion(criterionValue: Criterion, valueIndex?: number) {
		if (valueIndex !== undefined) {
			const next = currentFilter.removeCustomFieldCriterion(
				criterionValue.criterionOption.type,
				valueIndex,
			);
			setCurrentFilter(next);
			return;
		}

		removeCriterionByType(criterionValue.criterionOption.type);
	}

	function clearAllCriteria() {
		const nextFilter = currentFilter.clone();
		nextFilter.criteria = [];
		setCurrentFilter(nextFilter);
		setCriterion(undefined);
	}

	function setSearchTerm(value: string) {
		const next = currentFilter.clone();
		next.searchTerm = value;
		next.currentPage = 1;
		setCurrentFilter(next);
	}

	function togglePinned(option: CriterionOption) {
		const exists = pinnedIDs.includes(option.messageID);
		const next = exists
			? pinnedIDs.filter((id) => id !== option.messageID)
			: [...pinnedIDs, option.messageID];
		setPinnedIDs(next);
		saveToLocalStorage(pinnedStorageKey(currentFilter.mode), next);
	}

	return (
		<Modal
			show
			onHide={onCancel}
			className={cx("edit-filter-dialog", {
				"criterion-selected": !!criterion,
			})}
		>
			<Modal.Header closeButton>
				<div className="mr-2">
					{intl.formatMessage({ id: "search_filter.edit_filter" })}
				</div>
				<Form.Control
					className="btn-secondary search-input"
					onChange={(e: any) => setSearchValue(String(e.target.value || ""))}
					value={searchValue}
					placeholder={`${intl.formatMessage({ id: "actions.search" })}...`}
				/>
			</Modal.Header>
			<Modal.Body>
				<div className="dialog-content">
					<div className="search-term-row">
						<span>
							{intl.formatMessage({ id: "search_filter.search_term" })}
						</span>
						<Form.Control
							className="search-term-input"
							value={currentFilter.searchTerm || ""}
							onChange={(e: any) => setSearchTerm(String(e.target.value || ""))}
						/>
					</div>

					<CriterionOptionList
						criteriaTypes={criteriaTypes}
						currentCriterion={criterion}
						setCriterion={replaceCriterion}
						criterionOptions={unpinnedOptions}
						pinnedCriterionOptions={pinnedOptions}
						optionSelected={optionSelected}
						selected={criterion?.criterionOption}
						onRemoveCriterion={removeCriterionByType}
						onTogglePin={togglePinned}
					/>

					<FilterTags
						searchTerm={currentFilter.searchTerm}
						criteria={criteria}
						onEditSearchTerm={() => undefined}
						onEditCriterion={(c) => optionSelected(c.criterionOption)}
						onRemoveCriterion={removeCriterion}
						onRemoveAll={clearAllCriteria}
						onRemoveSearchTerm={() => setSearchTerm("")}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer className="d-flex justify-content-between">
				<div>
					<Button variant="secondary" onClick={clearAllCriteria}>
						Clear criteria
					</Button>
				</div>
				<div>
					<Button variant="secondary" onClick={onCancel}>
						{intl.formatMessage({ id: "actions.cancel" })}
					</Button>
					<Button className="ml-2" onClick={() => onApply(currentFilter)}>
						{intl.formatMessage({ id: "actions.apply" })}
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export function useShowEditFilter(props: {
	filter: ListFilterModel;
	setFilter: (f: ListFilterModel) => void;
	showModal: (content: any) => void;
	closeModal: () => void;
}) {
	const { filter, setFilter, showModal, closeModal } = props;

	return React.useCallback(
		(editingCriterion?: CriterionType | string) => {
			function onApplyEditFilter(nextFilter: ListFilterModel) {
				closeModal();
				setFilter(nextFilter);
			}

			showModal(
				<EditFilterDialog
					filter={filter}
					onApply={onApplyEditFilter}
					onCancel={closeModal}
					editingCriterion={
						editingCriterion ? String(editingCriterion) : undefined
					}
				/>,
			);
		},
		[filter, setFilter, showModal, closeModal],
	);
}
