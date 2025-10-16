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
    const [status, setStatus] = React.useState("");
    const [running, setRunning] = React.useState(false);
    const [operations, setOperations] = React.useState([]);

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
              checked: dryRun,
              onChange: (e) => setDryRun(e.target.checked),
            }),
            React.createElement(
              "label",
              { className: "form-check-label" },
              "Dry Run (Preview only, no actual renaming)"
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
                  React.createElement("th", null, "Status"),
                  React.createElement("th", null, "Scene ID"),
                  React.createElement("th", null, "Old Filename"),
                  React.createElement("th", null, "New Filename"),
                  React.createElement("th", null, "Error")
                )
              ),
              React.createElement(
                "tbody",
                null,
                operations.map((op, idx) =>
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
