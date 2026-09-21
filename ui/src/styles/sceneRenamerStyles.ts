export function ensureSceneRenamerStyles(): void {
	const styleId = "stash-renamer-shared-styles";
	if (document.getElementById(styleId)) return;

	const style = document.createElement("style");
	style.id = styleId;
	style.textContent = `
    .stash-renamer-page {
      --sr-main-toolbar-offset: 48.75px;
      --sr-tabs-height: 46px;
    }

    .sr-toggle-checkbox-btn > input,
    .sr-toggle-checkbox-btn input[type="checkbox"],
    .sr-toggle-checkbox-btn input[type="radio"],
    .sr-toggle-checkbox-btn .btn-check {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
      opacity: 0 !important;
      pointer-events: none !important;
      position: absolute !important;
    }
   

   .scene-token-root .sr-collapse-button {
      display: inline-flex !important;
      align-items: center;
      flex-wrap: nowrap !important;
      gap: 0.25rem;
      max-width: 100%;
      min-width: 0;
      white-space: nowrap;
      overflow: visible;
    }

    .scene-token-root .sr-collapse-button .svg-inline--fa,
    .scene-token-root .sr-collapse-button svg {
      flex: 0 0 auto;
    }

    .scene-token-root .sr-collapse-button-label {
      display: inline-block;
      min-width: 0;
      max-width: 100%;
      white-space: nowrap;
      overflow: visible;
      text-overflow: ellipsis;
    }
    
    .stash-renamer-page .alert {
      padding: 0.4rem 1rem !important;

    }
      .stash-renamer-table {
      border: unset;
      }
            .stash-renamer-table th {
      align-content: center;
      }
      .stash-renamer-table .table-cell-content li,
            .stash-renamer-table .table-cell-content ul{
            margin: 0;

      display:block;
      padding: 0;
      }
    .stash-renamer-table td {
      align-content: center;
    }
    .stash-renamer-list-path-badge {
      font-size: 80%;
      font-weight: 700;
      line-height: 1.2;
      overflow-wrap: anywhere;
      text-align: left;
      white-space: unset;
      word-wrap: anywhere;
    }

    .stash-renamer-page .pagination-footer .pagination.btn-group {
    box-shadow: 0 8px 10px 2px rgba(0,0,0,.3);
}

    // .edit-filter-dialog .modal-header {
    //   align-items: center;
    //   padding: 0.5rem 1rem;
    // }
    // .edit-filter-dialog .modal-header .search-input {
    //   width: auto;
    //   margin-left: auto;
    //   min-width: 240px;
    // }
    // .edit-filter-dialog .modal-body {
    //   max-height: min(550px, calc(100vh - 12rem));
    //   padding-left: 0;
    //   padding-right: 0;
    //   overflow-y: auto;
    // }
    // .edit-filter-dialog .modal-footer > div > :not(:first-child) {
    //   margin-left: 0.25rem;
    // }
    // .edit-filter-dialog .search-term-row {
    //   align-items: center;
    //   display: flex;
    //   gap: 0.5rem;
    //   justify-content: space-between;
    //   margin-bottom: 0.5rem;
    //   margin-left: 1.5rem;
    //   margin-right: 1rem;
    // }
    // .edit-filter-dialog .search-term-row .search-term-input {
    //   flex-basis: 75%;
    // }
    // .edit-filter-dialog .filter-tags {
    //   border-top: 1px solid rgb(16 22 26 / 40%);
    //   padding: 1rem 1rem 0 1rem;
    //   display: flex;
    //   flex-wrap: wrap;
    //   gap: 0.4rem;
    //   align-items: center;
    // }
    // .edit-filter-dialog .filter-tags .tag-item {
    //   display: inline-flex;
    //   align-items: center;
    //   gap: 0.25rem;
    //   padding: 0.35rem 0.45rem;
    //   cursor: pointer;
    //   background-color: var(--bs-secondary-bg, #2b2f36);
    //   border: 1px solid rgba(255, 255, 255, 0.12);
    //   color: inherit;
    // }
    // .edit-filter-dialog .filter-tags .tag-item.search-term-filter-tag {
    //   background-color: rgba(13, 110, 253, 0.25);
    //   border-color: rgba(13, 110, 253, 0.45);
    // }
    // .edit-filter-dialog .filter-tags .tag-item.unsupported {
    //   border-color: rgba(255, 193, 7, 0.7);
    // }
    // .edit-filter-dialog .filter-tags .tag-item .btn {
    //   border: 0;
    //   padding: 0.05rem 0.2rem;
    //   line-height: 1;
    //   min-height: 0;
    // }
    // .edit-filter-dialog .filter-tags .clear-all-button {
    //   margin-left: auto;
    // }
    // .edit-filter-dialog .criterion-list .pinned-criterion-divider {
    //   padding-bottom: 0.5rem;
    // }
    // .edit-filter-dialog .criterion-list .card {
    //   border: 1px solid rgb(16 22 26 / 40%);
    //   box-shadow: none;
    //   margin: 0 0 -1px;
    //   padding: 0;
    // }
    // .edit-filter-dialog .criterion-list .collapse-icon {
    //   margin-left: 0;
    // }
    // .edit-filter-dialog .criterion-list .filter-item-header {
    //   background-color: var(--bs-secondary-bg, #2b2f36);
    //   border: none;
    //   border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    //   color: inherit;
    //   cursor: pointer;
    //   display: flex;
    //   margin-bottom: 0;
    //   padding: 0.75rem 1rem;
    //   width: 100%;
    //   text-align: left;
    //   align-items: center;
    // }
    // .edit-filter-dialog .criterion-list .filter-item-header .btn {
    //   border: 0;
    //   padding-bottom: 0;
    //   padding-top: 0;
    // }
    // .edit-filter-dialog .pin-criterion-button .tilted {
    //   transform: rotate(45deg);
    // }
    // .edit-filter-dialog .remove-criterion-button {
    //   color: var(--bs-danger, #dc3545);
    // }

    // .selectable-filter ul,
    // ul.selectable-list {
    //   list-style-type: none;
    //   margin-top: 0.5rem;
    //   max-height: 300px;
    //   overflow-y: auto;
    //   padding-bottom: 0.15rem;
    //   padding-inline-start: 0;
    // }
    // .selectable-filter ul .modifier-object {
    //   font-style: italic;
    // }
    // .selectable-filter ul .modifier-object .selected-object-label,
    // .selectable-filter ul .modifier-object .unselected-object-label {
    //   opacity: 0.6;
    // }
    // .selectable-filter ul .unselected-object {
    //   opacity: 0.85;
    // }
    // .selectable-filter ul .selected-object,
    // .selectable-filter ul .excluded-object,
    // .selectable-filter ul .unselected-object {
    //   cursor: pointer;
    //   margin-bottom: 0.25rem;
    //   min-height: 2em;
    // }
    // .selectable-filter ul .selected-object a,
    // .selectable-filter ul .excluded-object a,
    // .selectable-filter ul .unselected-object a {
    //   align-items: center;
    //   display: flex;
    //   justify-content: space-between;
    //   min-height: 2em;
    //   outline: none;
    //   text-decoration: none;
    //   color: inherit;
    //   padding: 0.15rem 0.35rem;
    //   border-radius: 4px;
    // }
    // .selectable-filter ul .selected-object a:hover,
    // .selectable-filter ul .excluded-object a:hover,
    // .selectable-filter ul .unselected-object a:hover,
    // .selectable-filter ul .selected-object a:focus-visible,
    // .selectable-filter ul .excluded-object a:focus-visible,
    // .selectable-filter ul .unselected-object a:focus-visible {
    //   background-color: rgba(138, 155, 168, 0.15);
    // }
    // .selectable-filter ul .selected-object-label,
    // .selectable-filter ul .excluded-object-label {
    //   font-size: 16px;
    // }
    // .selectable-filter ul .include-button {
    //   color: var(--bs-success, #198754);
    // }
    // .selectable-filter ul .exclude-icon {
    //   color: var(--bs-danger, #dc3545);
    // }
    // .selectable-filter ul .exclude-button {
    //   align-items: center;
    //   display: flex;
    //   margin-left: 0.25rem;
    //   padding-left: 0.25rem;
    //   padding-right: 0.25rem;
    //   border: 0;
    //   background: transparent;
    // }
    // .selectable-filter ul .exclude-button .exclude-button-text {
    //   color: var(--bs-danger, #dc3545);
    //   display: none;
    //   font-size: 12px;
    //   font-weight: 600;
    //   margin-right: 0.2rem;
    // }
    // .selectable-filter ul .exclude-button:hover .exclude-button-text,
    // .selectable-filter ul .exclude-button:focus .exclude-button-text {
    //   display: inline;
    // }
    // .selectable-filter ul .selected-object:hover .include-button,
    // .selectable-filter ul .selected-object a:focus-visible .include-button,
    // .selectable-filter ul .excluded-object:hover .exclude-icon,
    // .selectable-filter ul .excluded-object a:focus-visible .exclude-icon {
    //   color: #fff;
    // }

    // .filtered-list-toolbar {
    //   align-items: center;
    //   gap: 0.5rem;
    //   justify-content: center;
    //   margin-top: -0.5rem;
    //   padding-bottom: 0.5rem;
    //   padding-top: 0.5rem;
    //   display: flex;
    //   flex-wrap: wrap;
    // }
    // .filtered-list-toolbar > .btn-group {
    //   flex-wrap: wrap;
    //   justify-content: center;
    //   row-gap: 0.5rem;
    // }
    // .filter-button {
    //   position: relative;
    // }
    // .filter-button .badge {
    //   font-size: 60%;
    //   position: absolute;
    //   right: 0;
    //   z-index: 2;
    // }
  `;
	document.head.appendChild(style);
}
