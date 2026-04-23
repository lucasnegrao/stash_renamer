import { TaskProgressOverlay } from "./components/shared/TaskProgressOverlay";
import {
	getRenamerTaskOverlayState,
	resetRenamerRuntimeState,
	setActiveTabState,
	subscribeRenamerTaskOverlayState,
} from "./services/renamerRuntimeState";
import { ensureSceneRenamerStyles } from "./styles/sceneRenamerStyles";
import { EditorView } from "./views/EditorView";
import { RenamerResults } from "./views/ResultsView";
import { SettingsView } from "./views/SettingsView";

(() => {
	const PluginApi = window.PluginApi;
	const React = PluginApi.React;
	const { Button, Nav } = PluginApi.libraries.Bootstrap;
	const { NavLink, Route, Switch, useLocation } =
		PluginApi.libraries.ReactRouterDOM;
	const { faEthernet } = PluginApi.libraries.FontAwesomeSolid;
	const isRenamerPath = (pathname: string) =>
		pathname === "/plugins/stash_renamer" ||
		pathname.startsWith("/plugins/stash_renamer/");
	let currentPath = String(window.location?.pathname || "");
	let patchesEnabled = isRenamerPath(currentPath);

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

	const MainPage: React.FC = () => {
		const location = useLocation();
		const match = PluginApi.libraries.ReactRouterDOM.useRouteMatch();

		let currentTab = "editor";
		if (location.pathname.endsWith("/results")) currentTab = "results";
		if (location.pathname.endsWith("/settings")) currentTab = "settings";

		// Only render when the route is an exact match to prevent Stash from double-rendering
		// since it renders plugin routes without exact mode, matching base and sub-routes simultaneously.
		if (match && !match.isExact) return null;

		React.useEffect(() => {
			setActiveTabState(currentTab as any);
		}, [currentTab]);
		const [globalTaskOverlay, setGlobalTaskOverlay] = React.useState(() =>
			getRenamerTaskOverlayState(),
		);

		React.useEffect(() => {
			const unsub = subscribeRenamerTaskOverlayState((payload) => {
				setGlobalTaskOverlay(payload);
			});
			return () => unsub();
		}, []);

		const pageRef = React.useRef<HTMLDivElement | null>(null);
		const componentsToLoad = [
			PluginApi.loadableComponents.Scenes,
			PluginApi.loadableComponents.Scene,
			PluginApi.loadableComponents.SceneDetailPanel,
			PluginApi.loadableComponents.SceneList,
			PluginApi.loadableComponents.SceneQueryModal,
		];
		const _componentsLoading =
			PluginApi.hooks.useLoadComponents(componentsToLoad);

		React.useEffect(() => {
			ensureSceneRenamerStyles();
		}, []);

		React.useLayoutEffect(() => {
			const pageEl = pageRef.current;
			if (!pageEl) return;
			const navEl = pageEl.querySelector(
				"#stash-renamer-tabs",
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
		}, [currentTab]);

		return (
			<>
				<div ref={pageRef} className="stash-renamer-page">
					<Nav
						variant="tabs"
						className="mb-3"
						id="stash-renamer-tabs"
						activeKey={currentTab}
					>
						<Nav.Item>
							<Nav.Link
								as={NavLink}
								exact
								to="/plugins/stash_renamer"
								eventKey="editor"
							>
								Editor
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link
								as={NavLink}
								to="/plugins/stash_renamer/results"
								eventKey="results"
							>
								Results
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link
								as={NavLink}
								to="/plugins/stash_renamer/settings"
								eventKey="settings"
							>
								Settings
							</Nav.Link>
						</Nav.Item>
					</Nav>
					<div className="pt-10 position-relative">
						<Switch>
							<Route exact path="/plugins/stash_renamer">
								<EditorView />
							</Route>
							<Route path="/plugins/stash_renamer/results">
								<RenamerResults />
							</Route>
							<Route path="/plugins/stash_renamer/settings">
								<SettingsView />
							</Route>
						</Switch>
						<TaskProgressOverlay
							show={Boolean(globalTaskOverlay?.show)}
							progress={Number(globalTaskOverlay?.progress || 0)}
							text={String(globalTaskOverlay?.text || "")}
						/>
					</div>
				</div>
			</>
		);
	};

	PluginApi.register.route("/plugins/stash_renamer", MainPage);
	PluginApi.register.route("/plugins/stash_renamer/results", MainPage);
	PluginApi.register.route("/plugins/stash_renamer/settings", MainPage);

	PluginApi.patch.before("MainNavBar.UtilityItems", (props: any) => {
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
		(props: any, _: any, Original: any) => {
			if (props.pluginID !== "stash_renamer") return <Original {...props} />;
			const { Setting } = PluginApi.components;

			return [
				<Original key="stash-renamer-plugin-settings-original" {...props} />,
				<Setting
					key="stash-renamer-hook-setting"
					heading="Scene Renamer Settings"
					subHeading="Configure hook behavior and clean rename history."
					children={<SettingsView className="mt-2" />}
				/>,
			];
		},
	);
})();
