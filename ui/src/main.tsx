import { RenamerSettingsPanel } from "./components/RenamerSettingsPanel";
import {
	getActiveTabState,
	resetRenamerRuntimeState,
	setActiveTabState,
	subscribeActiveTabState,
} from "./services/renamerRuntimeState";
import { ensureSceneRenamerStyles } from "./styles/sceneRenamerStyles";
import { EditorView } from "./views/EditorView";
import { RenamerResults } from "./views/results";
import { RenamerSettings } from "./views/settings";

(() => {
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
		const [tab, setTab] = React.useState(getActiveTabState());
		const pageRef = React.useRef<HTMLDivElement | null>(null);
		const componentsToLoad = [
			PluginApi.loadableComponents.Scenes,
			PluginApi.loadableComponents.Scene,
			PluginApi.loadableComponents.SceneDetailPanel,
			PluginApi.loadableComponents.SceneList,
			PluginApi.loadableComponents.SceneQueryModal,
		];
		const componentsLoading =
			PluginApi.hooks.useLoadComponents(componentsToLoad);

		// const { LoadingIndicator } = PluginApi.components;

		// if (componentsLoading) return <LoadingIndicator />;
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
								<EditorView />
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
					children={<RenamerSettingsPanel className="mt-2" />}
				/>,
			];
		},
	);
})();
