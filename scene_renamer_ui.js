(function () {
  ("use strict");

  const PluginApi = window.PluginApi;
  const React = PluginApi.React;
  const { Button } = PluginApi.libraries.Bootstrap;
  const { Link, NavLink } = PluginApi.libraries.ReactRouterDOM;
  const { faFileSignature } = PluginApi.libraries.FontAwesomeSolid;
  const USER_PREFS_KEY = "stash_renamer_ui_prefs_v1";

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

  // Scene Renamer UI Page
  const SceneRenamerPage = () => {
    const [template, setTemplate] = React.useState("$scene.studio.name - $scene.date - $scene.title");
    const [dryRun, setDryRun] = React.useState(true);
    // Path builder state
    const [pathTemplate, setPathTemplate] = React.useState("");
    const [pathLike, setPathLike] = React.useState("");
    const [excludePathLike, setExcludePathLike] = React.useState("");
    const [debugMode, setDebugMode] = React.useState(false);
    const [status, setStatus] = React.useState("");
    const [running, setRunning] = React.useState(false);
    const [operations, setOperations] = React.useState([]);
    const [sortField, setSortField] = React.useState(null);
    const [sortDirection, setSortDirection] = React.useState("asc");

    // New: selection/filters
    const GENDERS = ["MALE", "FEMALE", "TRANSGENDER_MALE", "TRANSGENDER_FEMALE", "INTERSEX", "NON_BINARY", "UNKNOWN"];
    const [filterPerformerGenders, setFilterPerformerGenders] = React.useState([]);
    // Tri-state filters: 'any' | 'true' | 'false'
    const [organized, setOrganized] = React.useState("any");
    const [grouped, setGrouped] = React.useState("any");
    const [filterStudio, setFilterStudio] = React.useState("");
    const [filterGroups, setFilterGroups] = React.useState("");
    const [filterTags, setFilterTags] = React.useState("");
    const [stashIDEndpoint, setStashIDEndpoint] = React.useState("");
    // Available catalogs and picker states
    const [availableTags, setAvailableTags] = React.useState([]);
    const [availableGroups, setAvailableGroups] = React.useState([]);
    // New: studios catalog
    const [availableStudios, setAvailableStudios] = React.useState([]);
    const [loadingTags, setLoadingTags] = React.useState(false);
    const [loadingGroups, setLoadingGroups] = React.useState(false);
    // New: loading studios
    const [loadingStudios, setLoadingStudios] = React.useState(false);
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
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(25);

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

    const getPaginatedOperations = () => {
      const sorted = getSortedOperations();
      const start = (currentPage - 1) * pageSize;
      return sorted.slice(start, start + pageSize);
    };
    const totalPages = Math.max(1, Math.ceil(operations.length / pageSize));


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
      setCurrentPage(1);
    }, [operations]);
    React.useEffect(() => {
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    }, [currentPage, totalPages]);

    const buildNameRegex = (csv) => {
      const names = (csv || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
      if (!names.length) return "";
      return `^(${names.join("|")})$`;
    };

    const buildScenesQueryInput = (mode) => {
      const andFilters = [];
      if (pathLike && pathLike.trim()) {
        andFilters.push({
          path: { value: pathLike.trim(), modifier: "INCLUDES" },
        });
      }
      if (excludePathLike && excludePathLike.trim()) {
        andFilters.push({
          NOT: {
            path: { value: excludePathLike.trim(), modifier: "INCLUDES" },
          },
        });
      }
      if (organized !== "any") {
        andFilters.push({ organized: organized === "true" });
      }
      if (grouped === "true") {
        andFilters.push({
          groups_filter: {
            name: { value: "", modifier: "NOT_NULL" },
          },
        });
      } else if (grouped === "false") {
        andFilters.push({
          groups_filter: {
            name: { value: "", modifier: "IS_NULL" },
          },
        });
      }
      if (stashIDEndpoint && stashIDEndpoint.trim()) {
        andFilters.push({
          stash_id_endpoint: {
            endpoint: stashIDEndpoint.trim(),
            modifier: "EQUALS",
          },
        });
      }
      const tagsRegex = buildNameRegex(filterTags);
      if (tagsRegex) {
        andFilters.push({
          tags_filter: { name: { value: tagsRegex, modifier: "MATCHES_REGEX" } },
        });
      }
      const groupsRegex = buildNameRegex(filterGroups);
      if (groupsRegex) {
        andFilters.push({
          groups_filter: {
            name: { value: groupsRegex, modifier: "MATCHES_REGEX" },
          },
        });
      }
      const studiosRegex = buildNameRegex(filterStudio);
      if (studiosRegex) {
        andFilters.push({
          studios_filter: {
            name: { value: studiosRegex, modifier: "MATCHES_REGEX" },
          },
        });
      }
      if (filterPerformerGenders.length) {
        andFilters.push({
          performers_filter: {
            gender: {
              value: filterPerformerGenders,
              modifier: "INCLUDES",
            },
          },
        });
      }

      const sceneFilter = andFilters.length ? { AND: andFilters } : null;
      const ids =
        mode !== "dry_run" && selectedScenes.size > 0
          ? Array.from(selectedScenes)
          : null;
      const scenesQuery = `
        query FindScenesForRename($filter: FindFilterType, $scene_filter: SceneFilterType, $ids: [ID!]) {
          findScenes(filter: $filter, scene_filter: $scene_filter, ids: $ids) {
            scenes {
              id
              title
              code
              details
              director
              urls
              date
              rating100
              organized
              o_counter
              interactive
              interactive_speed
              created_at
              updated_at
              last_played_at
              resume_time
              play_duration
              play_count
              files { id path }
              studio { name }
              performers { name gender }
              tags { name }
              groups { group { id name } }
              scene_markers { id }
              stash_ids { stash_id }
            }
          }
        }
      `;
      const scenesQueryVariables = {
        filter: { per_page: 10000, page: 1 },
        scene_filter: sceneFilter,
        ids,
      };
      return { scenesQuery, scenesQueryVariables };
    };

    const runRename = async (mode) => {
      setRunning(true);
      setStatus("Running...");
      setOperations([]); // Clear previous results

      try {
        const { scenesQuery, scenesQueryVariables } = buildScenesQueryInput(mode);
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
                filename_template: template,
                path_template: pathTemplate,
                dry_run: dryRun.toString(),
                debugMode: debugMode.toString(),
                scenes_query: scenesQuery,
                scenes_query_variables: scenesQueryVariables,
                scenes_query_path: "findScenes.scenes",
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
            const operationsPayload = Array.isArray(pluginData?.operations)
              ? pluginData.operations
              : Array.isArray(pluginData?.output?.operations)
              ? pluginData.output.operations
              : [];

            if (operationsPayload.length) {
              setOperations(operationsPayload);
              setStatus(
                `Completed! Found ${operationsPayload.length} operations.`
              );
              console.log("Operations set:", operationsPayload);
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

          if (settings.filename_template || settings.template) {
            setTemplate(settings.filename_template ?? settings.template);
          }

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
          setDebugMode(
            toBool(settings.debugMode ?? settings.debug_mode, debugMode)
          );

          // Path builder defaults
          setPathTemplate(
            settings.pathTemplate ?? settings.path_template ?? ""
          );

          // New: filters
          setFilterPerformerGenders(
            toArray(
              settings.filterPerformerGenders ??
                settings.filter_performer_genders
            )
          );
          setOrganized(
            toTri(settings.filterOrganized ?? settings.filter_organized)
          );
          setGrouped(toTri(settings.filterGrouped ?? settings.filter_grouped));
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
        })
        .finally(() => {
          if (!mounted) return;
          try {
            const raw = localStorage.getItem(USER_PREFS_KEY);
            if (!raw) return;
            const p = JSON.parse(raw);
            if (!p || typeof p !== "object") return;
            if (p.template !== undefined) setTemplate(String(p.template));
            if (p.dryRun !== undefined) setDryRun(Boolean(p.dryRun));
            if (p.pathTemplate !== undefined)
              setPathTemplate(String(p.pathTemplate));
            if (p.pathLike !== undefined) setPathLike(String(p.pathLike));
            if (p.excludePathLike !== undefined)
              setExcludePathLike(String(p.excludePathLike));
            if (p.debugMode !== undefined) setDebugMode(Boolean(p.debugMode));
            if (p.organized !== undefined) setOrganized(String(p.organized));
            if (p.grouped !== undefined) setGrouped(String(p.grouped));
            if (p.filterStudio !== undefined)
              setFilterStudio(String(p.filterStudio));
            if (p.filterGroups !== undefined)
              setFilterGroups(String(p.filterGroups));
            if (p.filterTags !== undefined) setFilterTags(String(p.filterTags));
            if (p.stashIDEndpoint !== undefined)
              setStashIDEndpoint(String(p.stashIDEndpoint));
            if (p.pageSize !== undefined && Number(p.pageSize) > 0)
              setPageSize(Number(p.pageSize));
            if (Array.isArray(p.filterPerformerGenders))
              setFilterPerformerGenders(
                p.filterPerformerGenders.map((x) => String(x))
              );
          } catch (e) {
            console.warn("Failed to load user-space prefs:", e);
          }
        });

      return () => {
        mounted = false;
      };
    }, []);

    React.useEffect(() => {
      try {
        localStorage.setItem(
          USER_PREFS_KEY,
          JSON.stringify({
            template,
            dryRun,
            pathTemplate,
            pathLike,
            excludePathLike,
            debugMode,
            organized,
            grouped,
            filterStudio,
            filterGroups,
            filterTags,
            stashIDEndpoint,
            pageSize,
            filterPerformerGenders,
          })
        );
      } catch (e) {
        console.warn("Failed to persist user-space prefs:", e);
      }
    }, [
      template,
      dryRun,
      pathTemplate,
      pathLike,
      excludePathLike,
      debugMode,
      organized,
      grouped,
      filterStudio,
      filterGroups,
      filterTags,
      stashIDEndpoint,
      pageSize,
      filterPerformerGenders,
    ]);

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
            placeholder: "$scene.studio.name - $scene.date - $scene.title",
          }),
          React.createElement(
            "small",
            { className: "form-text text-muted" },
            "Use introspected tags like $scene.title, $scene.studio.name, $performer.name, $performer[0].name, $group.name."
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
            placeholder: "e.g., /Library/$scene.studio.name or $up/Archive/$scene.studio.name",
          }),
          React.createElement(
            "small",
            { className: "form-text text-muted" },
            "Build destination folder with the same tags. Starts with / or \\ = absolute path; otherwise relative. $up is replaced by .."
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
      // Filter by stash_id_endpoint
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "label",
          { className: "col-sm-2 col-form-label" },
          "Stash id endpoint:"
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement("input", {
            type: "text",
            className: "form-control",
            value: stashIDEndpoint,
            onChange: (e) => setStashIDEndpoint(e.target.value),
            placeholder: "e.g., https://stashdb.org/graphql",
          }),
          React.createElement(
            "small",
            { className: "form-text text-muted" },
            "Only include files with this endpoint"
          )
        )
      ),

      // Selection and Filters
      React.createElement("hr", null),
      React.createElement("h5", null, "Selection and Filters"),
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

      // Grouped tri-state
      React.createElement(
        "div",
        { className: "form-group row" },
        React.createElement(
          "label",
          { className: "col-sm-2 col-form-label" },
          "Grouped:"
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement(
            "select",
            {
              className: "form-control",
              value: grouped,
              onChange: (e) => setGrouped(e.target.value),
            },
            React.createElement("option", { value: "any" }, "Any"),
            React.createElement(
              "option",
              { value: "true" },
              "Only grouped"
            ),
            React.createElement(
              "option",
              { value: "false" },
              "Only ungrouped"
            )
          )
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
              "div",
              { className: "d-flex justify-content-between align-items-center mb-2" },
              React.createElement(
                "div",
                null,
                React.createElement(
                  "small",
                  { className: "text-muted" },
                  `Page ${currentPage} of ${totalPages}`
                )
              ),
              React.createElement(
                "div",
                { className: "d-flex align-items-center" },
                React.createElement(
                  "label",
                  { className: "mb-0 mr-2" },
                  "Rows:"
                ),
                React.createElement(
                  "select",
                  {
                    className: "form-control form-control-sm mr-2",
                    style: { width: "88px" },
                    value: String(pageSize),
                    onChange: (e) => setPageSize(Number(e.target.value) || 25),
                  },
                  [10, 25, 50, 100].map((n) =>
                    React.createElement("option", { key: n, value: String(n) }, String(n))
                  )
                ),
                React.createElement(
                  Button,
                  {
                    variant: "secondary",
                    size: "sm",
                    className: "mr-1",
                    disabled: currentPage <= 1,
                    onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
                  },
                  "Prev"
                ),
                React.createElement(
                  Button,
                  {
                    variant: "secondary",
                    size: "sm",
                    disabled: currentPage >= totalPages,
                    onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
                  },
                  "Next"
                )
              )
            ),
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
                getPaginatedOperations().map((op, idx) =>
                  React.createElement(
                    "tr",
                    { key: `${op.scene_id || "scene"}-${idx}` },
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

      React.createElement("hr", null),
      React.createElement("h3", null, "How to Use"),
      React.createElement(
        "ul",
        null,
        React.createElement(
          "li",
          null,
          "Set your template using introspected tags like $scene.title, $scene.date, $scene.studio.name, $performer.name, and $group.name."
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
