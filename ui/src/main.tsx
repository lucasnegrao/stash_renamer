import { TaskProgressOverlay } from "./components/shared/TaskProgressOverlay";
import {
	fetchPluginRuntimeConfig,
	installRuntimeServiceTask,
	setPluginRuntimeConfig,
} from "./api/sceneRenamerApi";
import {
	getRenamerTaskOverlayState,
	resetRenamerRuntimeState,
	setActiveTabState,
	subscribeRenamerTaskOverlayState,
} from "./services/renamerRuntimeState";
import { trackTaskJob } from "./services/taskProgressService";
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
	let runtimeReady = false;
	const runtimeReadyListeners = new Set<(ready: boolean) => void>();
	const getRuntimeReady = () => runtimeReady;
	const setRuntimeReady = (next: boolean) => {
		runtimeReady = Boolean(next);
		runtimeReadyListeners.forEach((listener) => listener(runtimeReady));
	};
	const subscribeRuntimeReady = (listener: (ready: boolean) => void) => {
		runtimeReadyListeners.add(listener);
		return () => runtimeReadyListeners.delete(listener);
	};
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
		const { error: toastError } = PluginApi.hooks.useToast();

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
		const [runtimeCheckDone, setRuntimeCheckDone] = React.useState(false);
		const [runtimeCheckError, setRuntimeCheckError] = React.useState("");
		const [runtimeInstallOverlay, setRuntimeInstallOverlay] = React.useState<{
			show: boolean;
			progress: number;
			text: string;
		}>({
			show: false,
			progress: 0,
			text: "Preparing runtime...",
		});

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

		React.useEffect(() => {
			let cancelled = false;
			(async () => {
				try {
					const runtime = await fetchPluginRuntimeConfig("stash_renamer");
					if (
						runtime.installed &&
						String(runtime.pythonPath || "").trim().length > 0
					) {
						if (!cancelled) {
							setRuntimeCheckDone(true);
							setRuntimeReady(true);
						}
						return;
					}

					const jobId = await installRuntimeServiceTask();
					if (!jobId) {
						throw new Error("runtime install task did not return a job id");
					}
					if (!cancelled) {
						setRuntimeInstallOverlay({
							show: true,
							progress: 5,
							text: "Installing plugin runtime service...",
						});
					}
					const tracker = trackTaskJob(jobId, {
						onProgress: ({ progress, status, error }) => {
							if (cancelled) return;
							setRuntimeInstallOverlay({
								show: true,
								progress: Math.max(5, Math.min(100, Number(progress || 0))),
								text: error
									? `Runtime install: ${status} - ${String(error)}`
									: `Runtime install: ${status}`,
							});
						},
					});
					const final = await tracker.done;
					if (String(final.status || "").toUpperCase() !== "FINISHED") {
						throw new Error(
							final.error ||
								`runtime install task finished with status ${final.status}`,
						);
					}

					const nextRuntime = await fetchPluginRuntimeConfig("stash_renamer");
					if (
						!nextRuntime.installed ||
						String(nextRuntime.pythonPath || "").trim().length === 0
					) {
						await setPluginRuntimeConfig({
							pluginId: "stash_renamer",
							installed: false,
							pythonPath: "",
						});
						throw new Error(
							"runtime install task finished but plugin config is still missing pythonPath",
						);
					}
					if (!cancelled) {
						setRuntimeCheckDone(true);
						setRuntimeReady(true);
					}
				} catch (e: any) {
					const message = String(e?.message || e || "runtime setup failed");
					try {
						await setPluginRuntimeConfig({
							pluginId: "stash_renamer",
							installed: false,
							pythonPath: "",
						});
					} catch {
						// ignore config rollback failures
					}
					if (!cancelled) {
						setRuntimeCheckError(message);
						setRuntimeCheckDone(true);
						setRuntimeReady(false);
						setRuntimeInstallOverlay({
							show: false,
							progress: 0,
							text: "",
						});
					}
					toastError(`Scene Renamer runtime initialization failed: ${message}`);
				} finally {
					if (!cancelled) {
						setRuntimeInstallOverlay((prev) => ({
							...prev,
							show: false,
						}));
					}
				}
			})();
			return () => {
				cancelled = true;
			};
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
					{runtimeCheckDone && runtimeCheckError ? (
						<div className="alert alert-danger mx-2 mt-2" role="alert">
							Runtime initialization failed: {runtimeCheckError}
						</div>
					) : null}
					{runtimeCheckDone ? (
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
					) : null}
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
						<TaskProgressOverlay
							show={!runtimeCheckDone || runtimeInstallOverlay.show}
							progress={Number(runtimeInstallOverlay.progress || 0)}
							text={
								runtimeInstallOverlay.text ||
								"Preparing Scene Renamer runtime..."
							}
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

			const PluginSettingsGate: React.FC = () => {
				const [ready, setReady] = React.useState(getRuntimeReady());
				React.useEffect(() => subscribeRuntimeReady(setReady), []);

				if (!ready) {
					return (
						<Original key="stash-renamer-plugin-settings-original" {...props} />
					);
				}

				return (
					<Setting
						key="stash-renamer-hook-setting"
						heading="Scene Renamer Settings"
						subHeading="Configure hook behavior and clean rename history."
						children={<SettingsView className="mt-2" />}
					/>
				);
			};

			return [<PluginSettingsGate key="stash-renamer-plugin-settings-gate" />];
		},
	);
})();
