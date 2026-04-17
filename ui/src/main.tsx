import { SceneListTreeble } from "./components/SceneListTable";
import { SceneTokenSelector } from "./components/SceneTokenSelector";
import { RenamerSettingsPanel } from "./components/RenamerSettingsPanel";
import { RenamerEditor } from "./views/editor";
import { RenamerResults } from "./views/results";
import { RenamerSettings } from "./views/settings";
import { ensureSceneRenamerStyles } from "./styles/sceneRenamerStyles";
import {
	extractSceneTokenTree,
	fetchSelectorsCatalogCached,
	type ITokenTreeNode,
} from "./services/sceneRenamerApi";
import {
	captureSceneListFilterControlsFromProps,
	getActiveTabState,
	getScenePreviewByIdState,
	resetRenamerRuntimeState,
	setActiveTabState,
	setSceneListRuntimeFromProps,
	subscribeActiveTabState,
} from "./services/renamerRuntimeState";

(function () {
	const PluginApi = window.PluginApi;
	const React = PluginApi.React;
	const { Button, Tabs, Tab } = PluginApi.libraries.Bootstrap;
	const { NavLink } = PluginApi.libraries.ReactRouterDOM;
	const { faEthernet } = PluginApi.libraries.FontAwesomeSolid;
	const isRenamerPath = (pathname: string) =>
		pathname === "/plugins/stash_renamer" ||
		pathname.startsWith("/plugins/stash_renamer/");
	let currentPath = String(window.location?.pathname || "");
	let patchesEnabled = isRenamerPath(currentPath);
	let sceneListOriginalFn: ((props: any) => any) | null = null;
	let sidebarSectionsOriginalFn: ((props: any) => any) | null = null;

	PluginApi.Event.addEventListener("stash:location", (e: any) => {
		const nextPath = String(e?.detail?.data?.location?.pathname || "");
		const wasEnabled = patchesEnabled;
		patchesEnabled = isRenamerPath(nextPath);
		currentPath = nextPath;
		if (patchesEnabled && !wasEnabled) {
			resetRenamerRuntimeState();
		} else if (wasEnabled && !patchesEnabled) {
			resetRenamerRuntimeState();
		}
	});

	const SidebarSceneTokenSelector: React.FC = () => {
		const [tree, setTree] = React.useState<ITokenTreeNode[]>([]);
		const [loading, setLoading] = React.useState(false);

		const reload = async () => {
			try {
				setLoading(true);
				const output = await fetchSelectorsCatalogCached();
				setTree(extractSceneTokenTree(output));
			} catch (e) {
				console.error("[Scene Renamer] Failed to load selectors", e);
			} finally {
				setLoading(false);
			}
		};

		React.useEffect(() => {
			fetchSelectorsCatalogCached().catch(() => undefined);
			reload();
		}, []);

		return (
			<div className="px-2">
				<SceneTokenSelector tree={tree} loading={loading} onReload={reload} />
			</div>
		);
	};

	PluginApi.patch.after(
		"SceneList",
		(props: any, _original: any, result: any) => {
			if (!patchesEnabled) return result;
			setSceneListRuntimeFromProps(props);
			return result;
		},
	);

	PluginApi.patch.after(
		"FilteredSceneList",
		(props: any, _original: any, result: any) => {
			if (!patchesEnabled) return result;
			const setFilterFromResult =
				result?.props?.children?.props?.children?.[1]?.props?.children?.props
					?.children?.[0]?.props?.children?.props?.setFilter;
			const filterFromResult =
				result?.props?.children?.props?.children?.[1]?.props?.children?.props
					?.children?.[0]?.props?.children?.props?.filter;

			console.log(
				result?.props?.children?.props?.children?.[1]?.props?.children,
			);

			if (typeof setFilterFromResult === "function") {
				captureSceneListFilterControlsFromProps({
					filter: filterFromResult,
					setFilter: setFilterFromResult,
				});
				return result;
			}

			// Fallback when Stash tree shape changes.
			captureSceneListFilterControlsFromProps(props);
			return result;
		},
	);

	PluginApi.patch.instead(
		"SceneList",
		function (props: any, _arg: any, original: any) {
			// console.log(props)
			if (typeof original === "function") {
				sceneListOriginalFn = original;
			}
			if (!patchesEnabled) {
				const fallback =
					typeof original === "function" ? original : sceneListOriginalFn;
				return fallback ? fallback(props) : null;
			}
			return (
				<div
					className="scene-list-table-root"
					style={{ width: "100%", maxWidth: "100%", minWidth: 0 }}
				>
					<SceneListTreeble
						{...props}
						sceneOperationById={getScenePreviewByIdState()}
					/>
				</div>
			);
		},
	);

	PluginApi.patch.instead(
		"FilteredSceneList.SidebarSections",
		function (props: any, _arg: any, original: any) {
			if (typeof original === "function") {
				sidebarSectionsOriginalFn = original;
			}
			if (!patchesEnabled) {
				const fallback =
					typeof original === "function" ? original : sidebarSectionsOriginalFn;
				return fallback ? fallback(props) : null;
			}
			return [<SidebarSceneTokenSelector />];
		},
	);

	const MainPage: React.FC = () => {
		const [tab, setTab] = React.useState(getActiveTabState());
		const pageRef = React.useRef<HTMLDivElement | null>(null);

		React.useEffect(() => {
			const unsub = subscribeActiveTabState((nextTab) => setTab(nextTab));
			return () => unsub();
		}, []);

		React.useEffect(() => {
			ensureSceneRenamerStyles();
		}, []);

		React.useLayoutEffect(() => {
			const pageEl = pageRef.current;
			if (!pageEl) return;
			const navEl = pageEl.querySelector(
				"#stash-renamer-tabs > .nav",
			) as HTMLElement | null;
			if (!navEl) return;

			const update = () => {
				const h = Math.ceil(navEl.getBoundingClientRect().height || 46);
				pageEl.style.setProperty("--sr-tabs-height", `${h}px`);
			};
			update();

			if (typeof window.ResizeObserver !== "undefined") {
				const ro = new window.ResizeObserver(update);
				ro.observe(navEl);
				return () => ro.disconnect();
			}

			window.addEventListener("resize", update);
			return () => window.removeEventListener("resize", update);
		}, [tab]);

		return (
			<>
				<div ref={pageRef} className="stash-renamer-page">
					<Tabs
						className="mb-3"
						id="stash-renamer-tabs"
						activeKey={tab}
						onSelect={(k: any) =>
							setActiveTabState(String(k || "editor") as any)
						}
					>
						<Tab eventKey="editor" title="Editor">
							<div className="pt-10">
								<RenamerEditor />
							</div>
						</Tab>

						<Tab eventKey="results" title="Results">
							<div className="pt-10">
								<RenamerResults />
							</div>
						</Tab>

						<Tab eventKey="settings" title="Settings">
							<div className="pt-10">
								<RenamerSettings />
							</div>
						</Tab>
					</Tabs>
				</div>
			</>
		);
	};

	PluginApi.register.route("/plugins/stash_renamer", MainPage);
	PluginApi.register.route("/plugins/stash_renamer/results", RenamerResults);
	PluginApi.register.route("/plugins/stash_renamer/settings", RenamerSettings);

	PluginApi.patch.before("MainNavBar.UtilityItems", function (props: any) {
		const { Icon } = PluginApi.components;
		return [
			{
				children: (
					<>
						{props.children}
						<NavLink className="nav-utility" exact to="/plugins/stash_renamer">
							<Button
								className="minimal d-flex align-items-center h-100"
								title="Scene Renamer"
							>
								<Icon icon={faEthernet} />
							</Button>
						</NavLink>
					</>
				),
			},
		];
	});

	PluginApi.patch.instead(
		"PluginSettings",
		function (props: any, _: any, Original: any) {
			if (props.pluginID !== "stash_renamer") return <Original {...props} />;
			const { Setting } = PluginApi.components;

			return [
				<Original key="stash-renamer-plugin-settings-original" {...props} />,
				<Setting
					key="stash-renamer-hook-setting"
					heading="Scene Renamer Settings"
					subHeading="Configure hook behavior and clean rename history."
					children={<RenamerSettingsPanel className="mt-2" />}
				/>,
			];
		},
	);
})();
