(function () {
  "use strict";

  const PluginApi = window.PluginApi;
  const React = PluginApi.React;
  const { Button } = PluginApi.libraries.Bootstrap;
  const { Link, NavLink } = PluginApi.libraries.ReactRouterDOM;
  const { faFileSignature } = PluginApi.libraries.FontAwesomeSolid;

  // Scene Renamer UI Page
  const SceneRenamerPage = () => {
    const [template, setTemplate] = React.useState("$studio - $date - $title");
    const [dryRun, setDryRun] = React.useState(true);
    const [femaleOnly, setFemaleOnly] = React.useState(false);
    const [skipGrouped, setSkipGrouped] = React.useState(false);
    const [moveToStudioFolder, setMoveToStudioFolder] = React.useState(false);
    const [pathLike, setPathLike] = React.useState("");
    const [excludePathLike, setExcludePathLike] = React.useState("");
    const [debugMode, setDebugMode] = React.useState(false);
    const [status, setStatus] = React.useState("");
    const [running, setRunning] = React.useState(false);
    const [operations, setOperations] = React.useState([]);
    const [sortField, setSortField] = React.useState(null);
    const [sortDirection, setSortDirection] = React.useState("asc");

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
                femaleOnly: femaleOnly.toString(),
                skipGrouped: skipGrouped.toString(),
                moveToStudioFolder: moveToStudioFolder.toString(),
                pathLike: pathLike,
                excludePathLike: excludePathLike,
                debugMode: debugMode.toString(),
              },
            },
          }),
        });

        const result = await response.json();

        console.log("GraphQL result:", result);

        // The plugin outputs JSON which Stash returns here
        if (result.data && result.data.runPluginOperation) {
          try {
            console.log(
              "Plugin output string:",
              result.data.runPluginOperation
            );

            // Parse the JSON output from the plugin
            const pluginData = JSON.parse(result.data.runPluginOperation);
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
            placeholder: "$studio - $date - $title - $performer",
          }),
          React.createElement(
            "small",
            { className: "form-text text-muted" },
            "Available tokens: $studio, $date, $title, $performer, $height"
          )
        )
      ),

      // Settings accordion/collapsible
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
              "Dry Run (Preview only, no actual renaming)"
            )
          )
        )
      ),

      // Female Only checkbox
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
              id: "femaleOnly",
              checked: femaleOnly,
              onChange: (e) => setFemaleOnly(e.target.checked),
            }),
            React.createElement(
              "label",
              { className: "form-check-label", htmlFor: "femaleOnly" },
              "Female Performers Only (for $performer token)"
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
              "Skip Grouped Scenes (part of a movie/group)"
            )
          )
        )
      ),

      // Move to Studio Folder checkbox
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
              id: "moveToStudioFolder",
              checked: moveToStudioFolder,
              onChange: (e) => setMoveToStudioFolder(e.target.checked),
            }),
            React.createElement(
              "label",
              { className: "form-check-label", htmlFor: "moveToStudioFolder" },
              "Move to Studio Subfolder (create studio-named folders)"
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
              "Debug Mode (detailed logging)"
            )
          )
        )
      ),

      // Path filters
      React.createElement("hr", null),
      React.createElement("h5", null, "Path Filters (Optional)"),

      // Path Like (include)
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

      // Exclude Path Like
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

      React.createElement("hr", null),

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
