(function () {
  ("use strict");

  const PluginApi = window.PluginApi;
  const React = PluginApi.React;
  const { Button } = PluginApi.libraries.Bootstrap;
  const { Link, NavLink } = PluginApi.libraries.ReactRouterDOM;
  const { faFileSignature } = PluginApi.libraries.FontAwesomeSolid;

  // Generic GraphQL caller (no explicit auth needed from UI)
  async function gql(query, variables) {
    const resp = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    const json = await resp.json();
    if (json.errors) {
      throw new Error(JSON.stringify(json.errors));
    }
    return json.data;
  }

  // Fetch plugin settings from Stash configuration
  async function fetchPluginSettings(pluginId = "stash_renamer") {
    const query = `
      query configuration($plugin_id: [ID!]) {
        configuration {
          plugins(include: $plugin_id)
        }
      }
    `;
    try {
      const data = await gql(query, { plugin_id: [pluginId] });
      const plugins =
        (data && data.configuration && data.configuration.plugins) || {};
      let settingsRaw = plugins[pluginId];

      // Handle JSON-as-string or object
      if (!settingsRaw) return {};
      if (typeof settingsRaw === "string") {
        try {
          settingsRaw = JSON.parse(settingsRaw);
        } catch {
          return {};
        }
      }
      return settingsRaw || {};
    } catch (e) {
      console.warn("Failed to fetch plugin settings:", e);
      return {};
    }
  }

  // Paginated fetchers (fetch all pages)
  async function fetchAllTags() {
    const query = `
      query findTags($filter: FindFilterType!) {
        findTags(filter: $filter) {
          count
          tags { name }
        }
      }
    `;
    const perPage = 100;
    let page = 1;
    let out = [];
    for (;;) {
      const data = await gql(query, { filter: { per_page: perPage, page } });
      const res = (data && data.findTags) || {};
      const list = (res.tags || []).map((t) => t.name).filter(Boolean);
      out = out.concat(list);
      const count = typeof res.count === "number" ? res.count : null;
      if (count != null) {
        if (page * perPage >= count) break;
      } else if (list.length < perPage) {
        break;
      }
      page += 1;
    }
    // unique + sort
    return Array.from(new Set(out)).sort((a, b) => a.localeCompare(b));
  }

  async function fetchAllGroups() {
    const query = `
      query findGroups($filter: FindFilterType!) {
        findGroups(filter: $filter) {
          count
          groups { name }
        }
      }
    `;
    const perPage = 100;
    let page = 1;
    let out = [];
    for (;;) {
      const data = await gql(query, { filter: { per_page: perPage, page } });
      const res = (data && data.findGroups) || {};
      const list = (res.groups || []).map((g) => g.name).filter(Boolean);
      out = out.concat(list);
      const count = typeof res.count === "number" ? res.count : null;
      if (count != null) {
        if (page * perPage >= count) break;
      } else if (list.length < perPage) {
        break;
      }
      page += 1;
    }
    return Array.from(new Set(out)).sort((a, b) => a.localeCompare(b));
  }

  // New: fetch all studios
  async function fetchAllStudios() {
    const query = `
      query findStudios($filter: FindFilterType!) {
        findStudios(filter: $filter) {
          count
          studios { name }
        }
      }
    `;
    const perPage = 100;
    let page = 1;
    let out = [];
    for (;;) {
      const data = await gql(query, { filter: { per_page: perPage, page } });
      const res = (data && data.findStudios) || {};
      const list = (res.studios || []).map((s) => s.name).filter(Boolean);
      out = out.concat(list);
      const count = typeof res.count === "number" ? res.count : null;
      if (count != null) {
        if (page * perPage >= count) break;
      } else if (list.length < perPage) {
        break;
      }
      page += 1;
    }
    return Array.from(new Set(out)).sort((a, b) => a.localeCompare(b));
  }

   const TestPage = () => {
     const componentsToLoad = [
       PluginApi.loadableComponents.SceneCard,
       PluginApi.loadableComponents.PerformerSelect,
     ];
     const componentsLoading =
       PluginApi.hooks.useLoadComponents(componentsToLoad);

     const { SceneCard, LoadingIndicator, PerformerSelect } =
       PluginApi.components;

     if (componentsLoading) return React.createElement(LoadingIndicator);

     return React.createElement(
       "div",
       null,
       React.createElement("div", null, "This is a test page."),
       React.createElement(
         "div",
         null,
         React.createElement(PerformerSelect, {
           isMulti: true,
           onSelect: () => {},
           values: [],
         })
       )
     );
   };

  // Scene Renamer UI Page
  const SceneRenamerPage = () => {
    const [template, setTemplate] = React.useState("$studio - $date - $title");
    const [dryRun, setDryRun] = React.useState(true);
    const [skipGrouped, setSkipGrouped] = React.useState(false);
    // Remove moveToStudioFolder; add path builder states
    const [pathTemplate, setPathTemplate] = React.useState("");
    const [pathIsAbsolute, setPathIsAbsolute] = React.useState(false);
    const [pathLike, setPathLike] = React.useState("");
    const [excludePathLike, setExcludePathLike] = React.useState("");
    const [debugMode, setDebugMode] = React.useState(false);
    const [status, setStatus] = React.useState("");
    const [running, setRunning] = React.useState(false);
    const [operations, setOperations] = React.useState([]);
    const [sortField, setSortField] = React.useState(null);
    const [sortDirection, setSortDirection] = React.useState("asc");

    // New: selection/filters
    const GENDERS = [
      "MALE",
      "FEMALE",
      "TRANSGENDER_MALE",
      "TRANSGENDER_FEMALE",
      "INTERSEX",
      "NON_BINARY",
      "UNKNOWN", // Include performers with no gender set
    ];
    // Which performers to include in $performer/$performers tokens
    const [performerGenders, setPerformerGenders] = React.useState([]);
    // Scene inclusion filter: any performer in these genders
    const [filterPerformerGenders, setFilterPerformerGenders] = React.useState(
      []
    );
    // Tri-state filters: 'any' | 'true' | 'false'
    const [organized, setOrganized] = React.useState("any");
    const [interactive, setInteractive] = React.useState("any");
    const [minSceneMarkers, setMinSceneMarkers] = React.useState("");
    const [filterStudio, setFilterStudio] = React.useState("");
    const [filterGroups, setFilterGroups] = React.useState("");
    const [filterTags, setFilterTags] = React.useState("");
    // Optional tag-based selection (comma-separated)
    const [tags, setTags] = React.useState("");

    // Available catalogs and picker states
    const [availableTags, setAvailableTags] = React.useState([]);
    const [availableGroups, setAvailableGroups] = React.useState([]);
    // New: studios catalog
    const [availableStudios, setAvailableStudios] = React.useState([]);
    const [loadingTags, setLoadingTags] = React.useState(false);
    const [loadingGroups, setLoadingGroups] = React.useState(false);
    // New: loading studios
    const [loadingStudios, setLoadingStudios] = React.useState(false);
    const [showSelectTagsPicker, setShowSelectTagsPicker] =
      React.useState(false);
    const [showFilterTagsPicker, setShowFilterTagsPicker] =
      React.useState(false);
    const [showFilterGroupsPicker, setShowFilterGroupsPicker] =
      React.useState(false);
    // New: studio picker toggle
    const [showFilterStudiosPicker, setShowFilterStudiosPicker] =
      React.useState(false);
    const [tagSearch, setTagSearch] = React.useState("");
    const [groupSearch, setGroupSearch] = React.useState("");
    // New: studio search
    const [studioSearch, setStudioSearch] = React.useState("");

    // Scene selection state for operations table
    const [selectedScenes, setSelectedScenes] = React.useState(new Set());

    // Helpers for CSV <-> Set
    const csvToSet = (csv) =>
      new Set(
        (csv || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      );
    const setToCsv = (setVal) =>
      Array.from(setVal)
        .sort((a, b) => a.localeCompare(b))
        .join(",");

    // Sort function
    const handleSort = (field) => {
      const newDirection =
        sortField === field && sortDirection === "asc" ? "desc" : "asc";
      setSortField(field);
      setSortDirection(newDirection);
    };

    // Get sorted operations
    const getSortedOperations = () => {
      if (!sortField) return operations;

      return [...operations].sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];

        // Handle undefined values
        if (aVal === undefined) return 1;
        if (bVal === undefined) return -1;

        // Compare
        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    };

    // Scene selection handlers for operations table
    const handleSceneSelection = (sceneId, checked) => {
      const newSelected = new Set(selectedScenes);
      if (checked) {
        newSelected.add(sceneId);
      } else {
        newSelected.delete(sceneId);
      }
      setSelectedScenes(newSelected);
    };

    const selectAllScenes = () => {
      setSelectedScenes(new Set(operations.map((op) => op.scene_id)));
    };

    const unselectAllScenes = () => {
      setSelectedScenes(new Set());
    };

    // When operations change, select all by default
    React.useEffect(() => {
      if (operations.length > 0) {
        setSelectedScenes(new Set(operations.map((op) => op.scene_id)));
      }
    }, [operations]);

    const runRename = async (mode) => {
      setRunning(true);
      setStatus("Running...");
      setOperations([]); // Clear previous results

      try {
        const response = await fetch("/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `mutation RunPluginOperation($plugin_id: ID!, $args: Map!) {
              runPluginOperation(plugin_id: $plugin_id, args: $args)
            }`,
            variables: {
              plugin_id: "stash_renamer",
              args: {
                mode: mode,
                template: template,
                dry_run: dryRun.toString(),
                skipGrouped: skipGrouped.toString(),
                // removed: moveToStudioFolder
                pathLike: pathLike,
                excludePathLike: excludePathLike,
                debugMode: debugMode.toString(),
                // Path builder
                pathTemplate: pathTemplate,
                pathIsAbsolute: pathIsAbsolute.toString(),
                // New args
                tags: tags, // comma-separated
                performerGenders: performerGenders.join(","),
                filterPerformerGenders: filterPerformerGenders.join(","),
                filterOrganized: organized === "any" ? "" : organized,
                filterInteractive: interactive === "any" ? "" : interactive,
                filterMinSceneMarkers: minSceneMarkers
                  ? String(minSceneMarkers)
                  : "",
                filterStudio: filterStudio, // comma-separated exact names
                filterGroups: filterGroups, // comma-separated exact names
                filterTags: filterTags, // comma-separated exact names
                selectedScenes:
                  mode !== "dry_run" && selectedScenes.size > 0
                    ? Array.from(selectedScenes).join(",")
                    : "",
              },
            },
          }),
        });

        const result = await response.json();

        // The plugin outputs JSON which Stash returns here
        if (result.data && result.data.runPluginOperation) {
          try {
            console.log(
              "Plugin output string:",
              result.data.runPluginOperation
            );

            // Parse the JSON output from the plugin
            const pluginData = result.data.runPluginOperation;
            console.log("Parsed plugin data:", pluginData);

            if (pluginData.operations && Array.isArray(pluginData.operations)) {
              setOperations(pluginData.operations);
              setStatus(
                `Completed! Found ${pluginData.operations.length} operations.`
              );
              console.log("Operations set:", pluginData.operations);
            } else {
              console.log("No operations array found in:", pluginData);
              setStatus(
                "Completed! No operations returned. Check Settings → Logs → Plugins for details."
              );
            }
          } catch (parseError) {
            console.error("Failed to parse plugin output:", parseError);
            console.error("Raw output was:", result.data.runPluginOperation);
            setStatus(
              "Completed! Check Settings → Logs → Plugins for the rename operations list."
            );
          }
        } else {
          console.log("No runPluginOperation in result");
          setStatus("Completed! Check Settings → Logs → Plugins for details.");
        }
      } catch (error) {
        setStatus("Error: " + error.message);
      } finally {
        setRunning(false);
      }
    };

    // Load defaults from plugin settings (once)
    React.useEffect(() => {
      let mounted = true;

      const toBool = (v, defVal) => {
        if (v === undefined || v === null) return defVal;
        if (typeof v === "boolean") return v;
        if (typeof v === "number") return v !== 0;
        const s = String(v).trim().toLowerCase();
        return ["true", "1", "yes", "y", "on"].includes(s);
      };
      const toArray = (v) => {
        if (Array.isArray(v)) return v.map(String);
        if (typeof v === "string")
          return v
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        if (v == null) return [];
        try {
          // sometimes JSON-encoded arrays are stored
          const parsed = JSON.parse(v);
          return Array.isArray(parsed) ? parsed.map(String) : [];
        } catch {
          return [];
        }
      };
      const toTri = (v) => {
        if (
          v === undefined ||
          v === null ||
          v === "" ||
          String(v).toLowerCase() === "any"
        )
          return "any";
        return toBool(v, false) ? "true" : "false";
      };
      const toCsv = (v, defVal = "") => {
        if (Array.isArray(v)) return v.join(",");
        if (typeof v === "string") return v;
        return defVal;
      };

      fetchPluginSettings("stash_renamer")
        .then((settings) => {
          if (!mounted || !settings) return;

          if (settings.template) setTemplate(settings.template);

          if (
            settings.pathLike !== undefined ||
            settings.path_like !== undefined
          ) {
            setPathLike(settings.pathLike ?? settings.path_like ?? "");
          }
          if (
            settings.excludePathLike !== undefined ||
            settings.exclude_path_like !== undefined
          ) {
            setExcludePathLike(
              settings.excludePathLike ?? settings.exclude_path_like ?? ""
            );
          }

          setDryRun(toBool(settings.dryRun ?? settings.dry_run, dryRun));
          setSkipGrouped(
            toBool(settings.skipGrouped ?? settings.skip_grouped, skipGrouped)
          );
          // removed: setMoveToStudioFolder(...)
          setDebugMode(
            toBool(settings.debugMode ?? settings.debug_mode, debugMode)
          );

          // Path builder defaults
          setPathTemplate(
            settings.pathTemplate ?? settings.path_template ?? ""
          );
          setPathIsAbsolute(
            toBool(settings.pathIsAbsolute ?? settings.path_is_absolute, false)
          );

          // New: tag selection and filters
          setTags(toCsv(settings.tags ?? "", ""));
          setPerformerGenders(
            toArray(settings.performerGenders ?? settings.performer_genders)
          );
          setFilterPerformerGenders(
            toArray(
              settings.filterPerformerGenders ??
                settings.filter_performer_genders
            )
          );
          setOrganized(
            toTri(settings.filterOrganized ?? settings.filter_organized)
          );
          setInteractive(
            toTri(settings.filterInteractive ?? settings.filter_interactive)
          );
          const msm =
            settings.filterMinSceneMarkers ?? settings.filter_min_scene_markers;
          setMinSceneMarkers(msm != null ? String(msm) : "");
          setFilterStudio(
            toCsv(settings.filterStudio ?? settings.filter_studio, "")
          );
          setFilterGroups(
            toCsv(settings.filterGroups ?? settings.filter_groups, "")
          );
          setFilterTags(toCsv(settings.filterTags ?? settings.filter_tags, ""));
        })
        .catch((e) => {
          console.warn("Settings load failed:", e);
        });

      return () => {
        mounted = false;
      };
    }, []);

    // Lazy-load tags/groups on first open
    const ensureTagsLoaded = async () => {
      if (availableTags.length || loadingTags) return;
      try {
        setLoadingTags(true);
        const all = await fetchAllTags();
        setAvailableTags(all);
      } catch (e) {
        console.warn("Failed to load tags:", e);
      } finally {
        setLoadingTags(false);
      }
    };
    const ensureGroupsLoaded = async () => {
      if (availableGroups.length || loadingGroups) return;
      try {
        setLoadingGroups(true);
        const all = await fetchAllGroups();
        setAvailableGroups(all);
      } catch (e) {
        console.warn("Failed to load groups:", e);
      } finally {
        setLoadingGroups(false);
      }
    };
    // New: lazy-load studios on first open
    const ensureStudiosLoaded = async () => {
      if (availableStudios.length || loadingStudios) return;
      try {
        setLoadingStudios(true);
        const all = await fetchAllStudios();
        setAvailableStudios(all);
      } catch (e) {
        console.warn("Failed to load studios:", e);
      } finally {
        setLoadingStudios(false);
      }
    };

    return React.createElement(
      "div",
      { className: "container-fluid" },
      React.createElement("h1", null, "Scene Renamer"),
      React.createElement("hr", null),

      // Template input
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "label",
          { className: "col-sm-2 col-form-label" },
          "Filename Template:"
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement("input", {
            type: "text",
            className: "form-control",
            value: template,
            onChange: (e) => setTemplate(e.target.value),
            placeholder: "$studio - $date - $title - $performers",
          }),
          React.createElement(
            "small",
            { className: "form-text text-muted" },
            "Tokens: $id $title $code $details $director $urls $date $rating100 $organized $o_counter $interactive $interactive_speed $created_at $updated_at $last_played_at $resume_time $play_duration $play_count $tags $groups $scene_markers_count $performers $studio"
          )
        )
      ),

      // Path Builder
      React.createElement("hr", null),
      React.createElement("h4", null, "Path Builder"),
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "label",
          { className: "col-sm-2 col-form-label" },
          "Path Template:"
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement("input", {
            type: "text",
            className: "form-control",
            value: pathTemplate,
            onChange: (e) => setPathTemplate(e.target.value),
            placeholder: "e.g., $studio/$date or $up/Archive/$studio",
          }),
          React.createElement(
            "small",
            { className: "form-text text-muted" },
            "Build destination folder using filename tokens. Use $up for parent in relative paths."
          )
        )
      ),
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "div",
          { className: "col-sm-10 offset-sm-2" },
          React.createElement(
            "div",
            { className: "form-check" },
            React.createElement("input", {
              type: "checkbox",
              className: "form-check-input",
              id: "pathIsAbsolute",
              checked: pathIsAbsolute,
              onChange: (e) => setPathIsAbsolute(e.target.checked),
            }),
            React.createElement(
              "label",
              { className: "form-check-label", htmlFor: "pathIsAbsolute" },
              "Absolute Path (otherwise relative to current file)"
            )
          )
        )
      ),

      // Options
      React.createElement("hr", null),
      React.createElement("h4", null, "Options"),
      // Dry run checkbox
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "div",
          { className: "col-sm-10 offset-sm-2" },
          React.createElement(
            "div",
            { className: "form-check" },
            React.createElement("input", {
              type: "checkbox",
              className: "form-check-input",
              id: "dryRun",
              checked: dryRun,
              onChange: (e) => setDryRun(e.target.checked),
            }),
            React.createElement(
              "label",
              { className: "form-check-label", htmlFor: "dryRun" },
              "Dry Run (Preview only)"
            )
          )
        )
      ),

      // Skip Grouped checkbox
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "div",
          { className: "col-sm-10 offset-sm-2" },
          React.createElement(
            "div",
            { className: "form-check" },
            React.createElement("input", {
              type: "checkbox",
              className: "form-check-input",
              id: "skipGrouped",
              checked: skipGrouped,
              onChange: (e) => setSkipGrouped(e.target.checked),
            }),
            React.createElement(
              "label",
              { className: "form-check-label", htmlFor: "skipGrouped" },
              "Skip Grouped Scenes"
            )
          )
        )
      ),

      // Debug Mode checkbox
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "div",
          { className: "col-sm-10 offset-sm-2" },
          React.createElement(
            "div",
            { className: "form-check" },
            React.createElement("input", {
              type: "checkbox",
              className: "form-check-input",
              id: "debugMode",
              checked: debugMode,
              onChange: (e) => setDebugMode(e.target.checked),
            }),
            React.createElement(
              "label",
              { className: "form-check-label", htmlFor: "debugMode" },
              "Debug Mode"
            )
          )
        )
      ),

      // Path filters
      React.createElement("hr", null),
      React.createElement("h5", null, "Path Filters (Optional)"),
      // Include
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "label",
          { className: "col-sm-2 col-form-label" },
          "Include Path:"
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement("input", {
            type: "text",
            className: "form-control",
            value: pathLike,
            onChange: (e) => setPathLike(e.target.value),
            placeholder: "e.g., /mnt/media/scenes/",
          }),
          React.createElement(
            "small",
            { className: "form-text text-muted" },
            "Only rename files with paths containing this substring"
          )
        )
      ),
      // Exclude
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "label",
          { className: "col-sm-2 col-form-label" },
          "Exclude Path:"
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement("input", {
            type: "text",
            className: "form-control",
            value: excludePathLike,
            onChange: (e) => setExcludePathLike(e.target.value),
            placeholder: "e.g., /mnt/media/temp/",
          }),
          React.createElement(
            "small",
            { className: "form-text text-muted" },
            "Skip files with paths containing this substring"
          )
        )
      ),

      // Selection and Filters
      React.createElement("hr", null),
      React.createElement("h5", null, "Selection and Filters"),
      // Tag-based selection
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "label",
          { className: "col-sm-2 col-form-label" },
          "Select by Tags:"
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement(
            "div",
            { className: "d-flex" },
            React.createElement("input", {
              type: "text",
              className: "form-control",
              value: tags,
              onChange: (e) => setTags(e.target.value),
              placeholder: "Comma-separated tag names for selection (optional)",
            }),
            React.createElement(
              Button,
              {
                className: "ml-2",
                onClick: async () => {
                  await ensureTagsLoaded();
                  setShowSelectTagsPicker((v) => !v);
                },
              },
              "Browse…"
            )
          ),
          showSelectTagsPicker &&
            React.createElement(
              "div",
              {
                className: "border rounded p-2 mt-2",
                style: { maxHeight: "280px", overflow: "auto" },
              },
              React.createElement(
                "div",
                { className: "d-flex mb-2" },
                React.createElement("input", {
                  type: "text",
                  className: "form-control",
                  placeholder: "Search tags…",
                  value: tagSearch,
                  onChange: (e) => setTagSearch(e.target.value),
                }),
                React.createElement(
                  Button,
                  { className: "ml-2", onClick: () => setTagSearch("") },
                  "Clear"
                )
              ),
              loadingTags
                ? React.createElement("div", null, "Loading tags…")
                : React.createElement(
                    React.Fragment,
                    null,
                    (availableTags || [])
                      .filter((n) =>
                        n.toLowerCase().includes(tagSearch.toLowerCase())
                      )
                      .map((name) =>
                        React.createElement(
                          "div",
                          { key: name, className: "form-check" },
                          React.createElement("input", {
                            type: "checkbox",
                            id: `sel-tag-${name}`,
                            className: "form-check-input",
                            checked: csvToSet(tags).has(name),
                            onChange: (e) => {
                              const next = csvToSet(tags);
                              if (e.target.checked) next.add(name);
                              else next.delete(name);
                              setTags(setToCsv(next));
                            },
                          }),
                          React.createElement(
                            "label",
                            {
                              className: "form-check-label",
                              htmlFor: `sel-tag-${name}`,
                            },
                            name
                          )
                        )
                      )
                  ),
              React.createElement(
                "div",
                { className: "mt-2 d-flex" },
                React.createElement(
                  Button,
                  {
                    variant: "secondary",
                    onClick: () => setShowSelectTagsPicker(false),
                  },
                  "Close"
                ),
                React.createElement(
                  Button,
                  {
                    className: "ml-2",
                    onClick: () => {
                      setTags("");
                      setTagSearch("");
                    },
                  },
                  "Clear All"
                )
              )
            ),
          React.createElement(
            "small",
            { className: "form-text text-muted" },
            "If set, only scenes with these tags will be selected"
          )
        )
      ),
      // Performer genders for tokens
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "label",
          { className: "col-sm-2 col-form-label" },
          "Performer Genders (tokens):"
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement(
            "select",
            {
              multiple: true,
              className: "form-control",
              value: performerGenders,
              onChange: (e) =>
                setPerformerGenders(
                  Array.from(e.target.selectedOptions).map((o) => o.value)
                ),
            },
            GENDERS.map((g) =>
              React.createElement("option", { key: g, value: g }, g)
            )
          ),
          React.createElement(
            "small",
            { className: "form-text text-muted" },
            "Only these genders will be included in $performers/$performer"
          )
        )
      ),
      // Performer genders filter
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "label",
          { className: "col-sm-2 col-form-label" },
          "Filter by Performer Genders:"
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement(
            "select",
            {
              multiple: true,
              className: "form-control",
              value: filterPerformerGenders,
              onChange: (e) =>
                setFilterPerformerGenders(
                  Array.from(e.target.selectedOptions).map((o) => o.value)
                ),
            },
            GENDERS.map((g) =>
              React.createElement("option", { key: g, value: g }, g)
            )
          ),
          React.createElement(
            "small",
            { className: "form-text text-muted" },
            "Include scenes with any of these performer genders"
          )
        )
      ),

      // Organized tri-state
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "label",
          { className: "col-sm-2 col-form-label" },
          "Organized:"
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement(
            "select",
            {
              className: "form-control",
              value: organized,
              onChange: (e) => setOrganized(e.target.value),
            },
            React.createElement("option", { value: "any" }, "Any"),
            React.createElement("option", { value: "true" }, "Only organized"),
            React.createElement(
              "option",
              { value: "false" },
              "Only unorganized"
            )
          )
        )
      ),

      // Interactive tri-state
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "label",
          { className: "col-sm-2 col-form-label" },
          "Interactive:"
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement(
            "select",
            {
              className: "form-control",
              value: interactive,
              onChange: (e) => setInteractive(e.target.value),
            },
            React.createElement("option", { value: "any" }, "Any"),
            React.createElement(
              "option",
              { value: "true" },
              "Only interactive"
            ),
            React.createElement(
              "option",
              { value: "false" },
              "Only non-interactive"
            )
          )
        )
      ),

      // Min scene markers
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "label",
          { className: "col-sm-2 col-form-label" },
          "Min Scene Markers:"
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement("input", {
            type: "number",
            min: "0",
            className: "form-control",
            value: minSceneMarkers,
            onChange: (e) =>
              setMinSceneMarkers(e.target.value.replace(/\D/g, "")),
            placeholder: "e.g., 1",
          })
        )
      ),

      // Studio filter (with Browse picker)
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "label",
          { className: "col-sm-2 col-form-label" },
          "Filter by Studio:"
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement(
            "div",
            { className: "d-flex" },
            React.createElement("input", {
              type: "text",
              className: "form-control",
              value: filterStudio,
              onChange: (e) => setFilterStudio(e.target.value),
              placeholder: "Comma-separated exact studio names",
            }),
            React.createElement(
              Button,
              {
                className: "ml-2",
                onClick: async () => {
                  await ensureStudiosLoaded();
                  setShowFilterStudiosPicker((v) => !v);
                },
              },
              "Browse…"
            )
          ),
          showFilterStudiosPicker &&
            React.createElement(
              "div",
              {
                className: "border rounded p-2 mt-2",
                style: { maxHeight: "280px", overflow: "auto" },
              },
              React.createElement(
                "div",
                { className: "d-flex mb-2" },
                React.createElement("input", {
                  type: "text",
                  className: "form-control",
                  placeholder: "Search studios…",
                  value: studioSearch,
                  onChange: (e) => setStudioSearch(e.target.value),
                }),
                React.createElement(
                  Button,
                  { className: "ml-2", onClick: () => setStudioSearch("") },
                  "Clear"
                )
              ),
              loadingStudios
                ? React.createElement("div", null, "Loading studios…")
                : React.createElement(
                    React.Fragment,
                    null,
                    (availableStudios || [])
                      .filter((n) =>
                        n.toLowerCase().includes(studioSearch.toLowerCase())
                      )
                      .map((name) =>
                        React.createElement(
                          "div",
                          { key: name, className: "form-check" },
                          React.createElement("input", {
                            type: "checkbox",
                            id: `filter-studio-${name}`,
                            className: "form-check-input",
                            checked: csvToSet(filterStudio).has(name),
                            onChange: (e) => {
                              const next = csvToSet(filterStudio);
                              if (e.target.checked) next.add(name);
                              else next.delete(name);
                              setFilterStudio(setToCsv(next));
                            },
                          }),
                          React.createElement(
                            "label",
                            {
                              className: "form-check-label",
                              htmlFor: `filter-studio-${name}`,
                            },
                            name
                          )
                        )
                      )
                  ),
              React.createElement(
                "div",
                { className: "mt-2 d-flex" },
                React.createElement(
                  Button,
                  {
                    variant: "secondary",
                    onClick: () => setShowFilterStudiosPicker(false),
                  },
                  "Close"
                ),
                React.createElement(
                  Button,
                  {
                    className: "ml-2",
                    onClick: () => {
                      setFilterStudio("");
                      setStudioSearch("");
                    },
                  },
                  "Clear All"
                )
              )
            )
        )
      ),

      // Groups filter with picker
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "label",
          { className: "col-sm-2 col-form-label" },
          "Filter by Groups:"
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement(
            "div",
            { className: "d-flex" },
            React.createElement("input", {
              type: "text",
              className: "form-control",
              value: filterGroups,
              onChange: (e) => setFilterGroups(e.target.value),
              placeholder: "Comma-separated exact group names",
            }),
            React.createElement(
              Button,
              {
                className: "ml-2",
                onClick: async () => {
                  await ensureGroupsLoaded();
                  setShowFilterGroupsPicker((v) => !v);
                },
              },
              "Browse…"
            )
          ),
          showFilterGroupsPicker &&
            React.createElement(
              "div",
              {
                className: "border rounded p-2 mt-2",
                style: { maxHeight: "280px", overflow: "auto" },
              },
              React.createElement(
                "div",
                { className: "d-flex mb-2" },
                React.createElement("input", {
                  type: "text",
                  className: "form-control",
                  placeholder: "Search groups…",
                  value: groupSearch,
                  onChange: (e) => setGroupSearch(e.target.value),
                }),
                React.createElement(
                  Button,
                  { className: "ml-2", onClick: () => setGroupSearch("") },
                  "Clear"
                )
              ),
              loadingGroups
                ? React.createElement("div", null, "Loading groups…")
                : React.createElement(
                    React.Fragment,
                    null,
                    (availableGroups || [])
                      .filter((n) =>
                        n.toLowerCase().includes(groupSearch.toLowerCase())
                      )
                      .map((name) =>
                        React.createElement(
                          "div",
                          { key: name, className: "form-check" },
                          React.createElement("input", {
                            type: "checkbox",
                            id: `filter-group-${name}`,
                            className: "form-check-input",
                            checked: csvToSet(filterGroups).has(name),
                            onChange: (e) => {
                              const next = csvToSet(filterGroups);
                              if (e.target.checked) next.add(name);
                              else next.delete(name);
                              setFilterGroups(setToCsv(next));
                            },
                          }),
                          React.createElement(
                            "label",
                            {
                              className: "form-check-label",
                              htmlFor: `filter-group-${name}`,
                            },
                            name
                          )
                        )
                      )
                  ),
              React.createElement(
                "div",
                { className: "mt-2 d-flex" },
                React.createElement(
                  Button,
                  {
                    variant: "secondary",
                    onClick: () => setShowFilterGroupsPicker(false),
                  },
                  "Close"
                ),
                React.createElement(
                  Button,
                  {
                    className: "ml-2",
                    onClick: () => {
                      setFilterGroups("");
                      setGroupSearch("");
                    },
                  },
                  "Clear All"
                )
              )
            )
        )
      ),

      // Tags filter with picker
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "label",
          { className: "col-sm-2 col-form-label" },
          "Filter by Tags:"
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement(
            "div",
            { className: "d-flex" },
            React.createElement("input", {
              type: "text",
              className: "form-control",
              value: filterTags,
              onChange: (e) => setFilterTags(e.target.value),
              placeholder: "Comma-separated exact tag names",
            }),
            React.createElement(
              Button,
              {
                className: "ml-2",
                onClick: async () => {
                  await ensureTagsLoaded();
                  setShowFilterTagsPicker((v) => !v);
                },
              },
              "Browse…"
            )
          ),
          showFilterTagsPicker &&
            React.createElement(
              "div",
              {
                className: "border rounded p-2 mt-2",
                style: { maxHeight: "280px", overflow: "auto" },
              },
              React.createElement(
                "div",
                { className: "d-flex mb-2" },
                React.createElement("input", {
                  type: "text",
                  className: "form-control",
                  placeholder: "Search tags…",
                  value: tagSearch,
                  onChange: (e) => setTagSearch(e.target.value),
                }),
                React.createElement(
                  Button,
                  { className: "ml-2", onClick: () => setTagSearch("") },
                  "Clear"
                )
              ),
              loadingTags
                ? React.createElement("div", null, "Loading tags…")
                : React.createElement(
                    React.Fragment,
                    null,
                    (availableTags || [])
                      .filter((n) =>
                        n.toLowerCase().includes(tagSearch.toLowerCase())
                      )
                      .map((name) =>
                        React.createElement(
                          "div",
                          { key: name, className: "form-check" },
                          React.createElement("input", {
                            type: "checkbox",
                            id: `filter-tag-${name}`,
                            className: "form-check-input",
                            checked: csvToSet(filterTags).has(name),
                            onChange: (e) => {
                              const next = csvToSet(filterTags);
                              if (e.target.checked) next.add(name);
                              else next.delete(name);
                              setFilterTags(setToCsv(next));
                            },
                          }),
                          React.createElement(
                            "label",
                            {
                              className: "form-check-label",
                              htmlFor: `filter-tag-${name}`,
                            },
                            name
                          )
                        )
                      )
                  ),
              React.createElement(
                "div",
                { className: "mt-2 d-flex" },
                React.createElement(
                  Button,
                  {
                    variant: "secondary",
                    onClick: () => setShowFilterTagsPicker(false),
                  },
                  "Close"
                ),
                React.createElement(
                  Button,
                  {
                    className: "ml-2",
                    onClick: () => {
                      setFilterTags("");
                      setTagSearch("");
                    },
                  },
                  "Clear All"
                )
              )
            )
        )
      ),

      // Run button
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "div",
          { className: "col-sm-10 offset-sm-2" },
          React.createElement(
            Button,
            {
              variant: dryRun ? "primary" : "danger",
              onClick: () => runRename(dryRun ? "dry_run" : "rename"),
              disabled: running,
            },
            running ? "Running..." : dryRun ? "Preview Renames" : "Rename Files"
          )
        )
      ),

      // Status
      status &&
        React.createElement(
          "div",
          { className: "alert alert-info mt-3" },
          status
        ),

      // Operations list
      operations.length > 0 &&
        React.createElement(
          "div",
          { className: "mt-4" },
          React.createElement("h3", null, "Rename Operations"),

          // Selection controls
          React.createElement(
            "div",
            { className: "mb-3 d-flex align-items-center" },
            React.createElement(
              "small",
              { className: "text-muted mr-3" },
              `${selectedScenes.size} of ${operations.length} operations selected`
            ),
            React.createElement(
              "button",
              {
                type: "button",
                className: "btn btn-sm btn-outline-secondary mr-2",
                onClick: selectAllScenes,
              },
              "Select All"
            ),
            React.createElement(
              "button",
              {
                type: "button",
                className: "btn btn-sm btn-outline-secondary mr-2",
                onClick: unselectAllScenes,
              },
              "Unselect All"
            ),
            !dryRun &&
              React.createElement(
                "small",
                { className: "text-info ml-3" },
                "Only selected operations will be processed during rename."
              )
          ),
          React.createElement(
            "div",
            { className: "table-responsive" },
            React.createElement(
              "table",
              { className: "table table-striped table-sm" },
              React.createElement(
                "thead",
                null,
                React.createElement(
                  "tr",
                  null,
                  React.createElement(
                    "th",
                    { style: { width: "50px" } },
                    React.createElement("input", {
                      type: "checkbox",
                      checked:
                        operations.length > 0 &&
                        selectedScenes.size === operations.length,
                      onChange: (e) =>
                        e.target.checked
                          ? selectAllScenes()
                          : unselectAllScenes(),
                      title: "Select/Unselect All",
                    })
                  ),
                  React.createElement(
                    "th",
                    {
                      onClick: () => handleSort("status"),
                      style: { cursor: "pointer", userSelect: "none" },
                    },
                    "Status ",
                    sortField === "status" &&
                      (sortDirection === "asc" ? "▲" : "▼")
                  ),
                  React.createElement(
                    "th",
                    {
                      onClick: () => handleSort("scene_id"),
                      style: { cursor: "pointer", userSelect: "none" },
                    },
                    "Scene ID ",
                    sortField === "scene_id" &&
                      (sortDirection === "asc" ? "▲" : "▼")
                  ),
                  React.createElement(
                    "th",
                    {
                      onClick: () => handleSort("old_filename"),
                      style: { cursor: "pointer", userSelect: "none" },
                    },
                    "Old Filename ",
                    sortField === "old_filename" &&
                      (sortDirection === "asc" ? "▲" : "▼")
                  ),
                  React.createElement(
                    "th",
                    {
                      onClick: () => handleSort("new_filename"),
                      style: { cursor: "pointer", userSelect: "none" },
                    },
                    "New Filename ",
                    sortField === "new_filename" &&
                      (sortDirection === "asc" ? "▲" : "▼")
                  ),
                  React.createElement(
                    "th",
                    {
                      onClick: () => handleSort("old_path"),
                      style: { cursor: "pointer", userSelect: "none" },
                    },
                    "Old Path ",
                    sortField === "old_path" &&
                      (sortDirection === "asc" ? "▲" : "▼")
                  ),
                  React.createElement(
                    "th",
                    {
                      onClick: () => handleSort("new_path"),
                      style: { cursor: "pointer", userSelect: "none" },
                    },
                    "New Path ",
                    sortField === "new_path" &&
                      (sortDirection === "asc" ? "▲" : "▼")
                  ),
                  React.createElement(
                    "th",
                    {
                      onClick: () => handleSort("error"),
                      style: { cursor: "pointer", userSelect: "none" },
                    },
                    "Error ",
                    sortField === "error" &&
                      (sortDirection === "asc" ? "▲" : "▼")
                  )
                )
              ),
              React.createElement(
                "tbody",
                null,
                getSortedOperations().map((op, idx) =>
                  React.createElement(
                    "tr",
                    { key: idx },
                    React.createElement(
                      "td",
                      null,
                      React.createElement("input", {
                        type: "checkbox",
                        checked: selectedScenes.has(op.scene_id),
                        onChange: (e) =>
                          handleSceneSelection(op.scene_id, e.target.checked),
                      })
                    ),
                    React.createElement(
                      "td",
                      null,
                      React.createElement(
                        "span",
                        {
                          className:
                            op.status === "success"
                              ? "badge badge-success"
                              : op.status === "error"
                              ? "badge badge-danger"
                              : "badge badge-secondary",
                        },
                        op.status
                      )
                    ),
                    React.createElement("td", null, op.scene_id),
                    React.createElement(
                      "td",
                      {
                        className: "text-truncate",
                        style: { maxWidth: "250px" },
                        title: op.old_filename,
                      },
                      op.old_filename
                    ),
                    React.createElement(
                      "td",
                      {
                        className: "text-truncate",
                        style: { maxWidth: "250px" },
                        title: op.new_filename,
                      },
                      op.new_filename
                    ),
                    React.createElement(
                      "td",
                      {
                        className: "text-truncate",
                        style: { maxWidth: "300px" },
                        title: op.old_path,
                      },
                      op.old_path || ""
                    ),
                    React.createElement(
                      "td",
                      {
                        className: "text-truncate",
                        style: { maxWidth: "300px" },
                        title: op.new_path,
                      },
                      op.new_path || ""
                    ),
                    React.createElement(
                      "td",
                      { className: "text-danger" },
                      op.error || ""
                    )
                  )
                )
              )
            )
          )
        ),
      React.createElement(TestPage, null),
      // Help section
      React.createElement("hr", null),
      React.createElement("h3", null, "How to Use"),
      React.createElement(
        "ul",
        null,
        React.createElement(
          "li",
          null,
          "Set your template using tokens like $studio, $date, $title, etc."
        ),
        React.createElement(
          "li",
          null,
          'Enable "Dry Run" to preview what files would be renamed'
        ),
        React.createElement(
          "li",
          null,
          'Click "Preview Renames" to see results in Settings → Logs'
        ),
        React.createElement(
          "li",
          null,
          'When satisfied, uncheck "Dry Run" and click "Rename Files"'
        ),
        React.createElement(
          "li",
          null,
          "Configure default settings in Settings → Plugins → Scene Renamer"
        )
      )
    );
  };

  // Register the route
  PluginApi.register.route("/scene-renamer", SceneRenamerPage);

  // Add button to Settings → Tools
  PluginApi.patch.before("SettingsToolsSection", function (props) {
    const { Setting } = PluginApi.components;

    return [
      {
        children: React.createElement(
          React.Fragment,
          null,
          props.children,
          React.createElement(Setting, {
            heading: React.createElement(
              Link,
              {
                to: "/scene-renamer",
                title: "Rename scene files based on metadata",
              },
              React.createElement(Button, null, "Scene Renamer")
            ),
          })
        ),
      },
    ];
  });

  // Add icon to top navigation
  PluginApi.patch.before("MainNavBar.UtilityItems", function (props) {
    const { Icon } = PluginApi.components;

    return [
      {
        children: React.createElement(
          React.Fragment,
          null,
          props.children,
          React.createElement(
            NavLink,
            {
              className: "nav-utility",
              exact: true,
              to: "/scene-renamer",
            },
            React.createElement(
              Button,
              {
                className: "minimal d-flex align-items-center h-100",
                title: "Scene Renamer",
              },
              React.createElement(Icon, { icon: faFileSignature })
            )
          )
        ),
      },
    ];
  });

  console.log("Scene Renamer UI loaded");
})();
