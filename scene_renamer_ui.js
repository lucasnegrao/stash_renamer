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

    const runRename = async (mode) => {
      setRunning(true);
      setStatus("Running...");

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
        setStatus("Completed! Check Settings → Logs for details.");
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
