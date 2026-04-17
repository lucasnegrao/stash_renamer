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

    .stash-renamer-page > .nav-tabs .nav-link.active {
      z-index: 1000;
    }

    .stash-renamer-page #stash-renamer-tabs > .nav {
      position: sticky;
      top: var(--sr-main-toolbar-offset);
      z-index: 101;
      background: var(--bs-body-bg, #111);
      margin-bottom: 0.75rem;
    }

    .stash-renamer-page #stash-renamer-tabs > .tab-content {
      position: relative;
      z-index: 1;
    }

    .stash-renamer-page .sidebar-pane .sidebar {
      top: calc(var(--sr-main-toolbar-offset) + var(--sr-tabs-height)) !important;
      margin-top: 0 !important;
      height: calc(100vh - (var(--sr-main-toolbar-offset) + var(--sr-tabs-height))) !important;
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
    .stash-renamer-page .clearable-input-group.search-term-input,
    .stash-renamer-page .list-operations,
    .stash-renamer-page .filtered-list-toolbar.btn-toolbar > div:nth-child(6),
    .stash-renamer-page .filtered-list-toolbar.btn-toolbar > div:nth-child(6) > button:nth-child(4),
    .stash-renamer-page .filtered-list-toolbar.btn-toolbar .zoom-slider-container,
    .stash-renamer-page .item-list-container.scene-list .pagination-index-container > div {
    display: none !important;
    }

    .stash-renamer-page .sr-collapse-button {
      display: inline-flex !important;
      align-items: center;
      flex-wrap: nowrap !important;
      gap: 0.25rem;
      max-width: 100%;
      min-width: 0;
      white-space: nowrap;
      overflow: visible;
    }

    .stash-renamer-page .sr-collapse-button .svg-inline--fa,
    .stash-renamer-page .sr-collapse-button svg {
      flex: 0 0 auto;
    }

    .stash-renamer-page .sr-collapse-button-label {
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
  `;
	document.head.appendChild(style);
}
