(function () {
  ("use strict");

  const PluginApi = window.PluginApi;
  if (!PluginApi) return;

  const React = PluginApi.React;
  const { Button } = PluginApi.libraries.Bootstrap;
  const { NavLink } = PluginApi.libraries.ReactRouterDOM;

  const SceneRenamerTopTabs = () =>
    React.createElement(
      "ul",
      { className: "nav nav-tabs mb-3" },
      React.createElement(
        "li",
        { className: "nav-item" },
        React.createElement(
          NavLink,
          {
            to: "/scene-renamer",
            exact: true,
            className: "nav-link",
            activeClassName: "active",
          },
          "Rename"
        )
      ),
      React.createElement(
        "li",
        { className: "nav-item" },
        React.createElement(
          NavLink,
          {
            to: "/scene-renamer-undo",
            exact: true,
            className: "nav-link",
            activeClassName: "active",
          },
          "Undo"
        )
      ),
      React.createElement(
        "li",
        { className: "nav-item" },
        React.createElement(
          NavLink,
          {
            to: "/scene-renamer-help",
            exact: true,
            className: "nav-link",
            activeClassName: "active",
          },
          "Template Help"
        )
      )
    );

  async function runPluginOperation(args) {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation RunPluginOperation($plugin_id: ID!, $args: Map!) {
          runPluginOperation(plugin_id: $plugin_id, args: $args)
        }`,
        variables: {
          plugin_id: "stash_renamer",
          args,
        },
      }),
    });
    const result = await response.json();
    if (result.errors && result.errors.length) {
      const err = result.errors
        .map((e) => e?.message || JSON.stringify(e))
        .join(" | ");
      throw new Error(err);
    }
    return (result.data && result.data.runPluginOperation) || null;
  }

  async function gql(query, variables) {
    const resp = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    const json = await resp.json();
    if (json.errors && json.errors.length) {
      const err = json.errors
        .map((e) => e?.message || JSON.stringify(e))
        .join(" | ");
      throw new Error(err);
    }
    return json.data;
  }

  function parsePluginPayload(pluginData) {
    if (!pluginData) return { operations: [], error: "No plugin response" };
    const pluginError =
      pluginData?.error ||
      pluginData?.output?.error ||
      pluginData?.message ||
      null;
    if (pluginError) return { operations: [], error: pluginError };
    const operations = Array.isArray(pluginData?.operations)
      ? pluginData.operations
      : Array.isArray(pluginData?.output?.operations)
      ? pluginData.output.operations
      : [];
    return { operations, error: null };
  }

  const UndoPage = () => {
    const [operations, setOperations] = React.useState([]);
    const [selected, setSelected] = React.useState(new Set());
    const [status, setStatus] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [runningUndo, setRunningUndo] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(25);

    const loadOperations = async () => {
      setLoading(true);
      setStatus("Loading operations...");
      try {
        const raw = await runPluginOperation({
          mode: "list_operations",
          list_operations: "true",
          debugMode: "false",
        });
        const parsed = parsePluginPayload(raw);
        if (parsed.error) {
          setStatus(`Error: ${parsed.error}`);
          return;
        }
        const sorted = (parsed.operations || []).sort((a, b) => {
          const ta = String(a.created_at || "");
          const tb = String(b.created_at || "");
          return tb.localeCompare(ta);
        });
        setOperations(sorted);
        setSelected(new Set());
        setPage(1);
        setStatus(`Loaded ${sorted.length} rename operations.`);
      } catch (e) {
        setStatus(`Error: ${e?.message || String(e)}`);
      } finally {
        setLoading(false);
      }
    };

    React.useEffect(() => {
      loadOperations();
    }, []);

    const totalPages = Math.max(1, Math.ceil(operations.length / pageSize));
    React.useEffect(() => {
      if (page > totalPages) setPage(totalPages);
    }, [page, totalPages]);

    const start = (page - 1) * pageSize;
    const pageRows = operations.slice(start, start + pageSize);

    const toggleOne = (opId, checked) => {
      const next = new Set(selected);
      if (checked) next.add(opId);
      else next.delete(opId);
      setSelected(next);
    };

    const selectableOnPage = pageRows.filter((r) => !r.undone).map((r) => r.id);

    const selectPage = () => {
      const next = new Set(selected);
      selectableOnPage.forEach((id) => next.add(id));
      setSelected(next);
    };

    const clearPage = () => {
      const next = new Set(selected);
      selectableOnPage.forEach((id) => next.delete(id));
      setSelected(next);
    };

    const undoSelected = async () => {
      const ids = Array.from(selected).filter(Boolean);
      if (!ids.length) {
        setStatus("Select at least one operation to undo.");
        return;
      }
      setRunningUndo(true);
      setStatus(`Undoing ${ids.length} operation(s)...`);
      let ok = 0;
      const errors = [];
      for (const opId of ids) {
        try {
          const raw = await runPluginOperation({
            mode: "undo",
            undo_operation_id: opId,
            debugMode: "false",
          });
          const parsed = parsePluginPayload(raw);
          if (parsed.error) {
            errors.push(`${opId}: ${parsed.error}`);
          } else {
            ok += 1;
          }
        } catch (e) {
          errors.push(`${opId}: ${e?.message || String(e)}`);
        }
      }
      if (errors.length) {
        setStatus(
          `Undone ${ok}/${ids.length}. Errors: ${errors.slice(0, 3).join(" | ")}`
        );
      } else {
        setStatus(`Undone ${ok}/${ids.length} operations.`);
      }
      await loadOperations();
      setRunningUndo(false);
    };

    return React.createElement(
      "div",
      { className: "container-fluid" },
      React.createElement("h1", null, "Scene Renamer"),
      React.createElement("hr", null),
      React.createElement(SceneRenamerTopTabs, null),
      React.createElement("h3", null, "Undo Renames"),
      React.createElement(
        "div",
        { className: "d-flex mb-2" },
        React.createElement(
          Button,
          { onClick: loadOperations, disabled: loading || runningUndo },
          loading ? "Refreshing..." : "Refresh"
        ),
        React.createElement(
          Button,
          {
            className: "ml-2",
            variant: "secondary",
            onClick: selectPage,
            disabled: loading || runningUndo || !selectableOnPage.length,
          },
          "Select Page"
        ),
        React.createElement(
          Button,
          {
            className: "ml-2",
            variant: "secondary",
            onClick: clearPage,
            disabled: loading || runningUndo || !selected.size,
          },
          "Clear Page"
        ),
        React.createElement(
          Button,
          {
            className: "ml-2",
            variant: "danger",
            onClick: undoSelected,
            disabled: loading || runningUndo || !selected.size,
          },
          runningUndo ? "Undoing..." : `Undo Selected (${selected.size})`
        )
      ),
      React.createElement(
        "div",
        { className: "mb-2" },
        React.createElement("strong", null, "Status: "),
        status || "Idle"
      ),
      React.createElement(
        "div",
        { className: "table-responsive" },
        React.createElement(
          "table",
          { className: "table table-sm table-striped table-hover" },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement("th", null, "Select"),
              React.createElement("th", null, "When"),
              React.createElement("th", null, "Scene"),
              React.createElement("th", null, "Old Path"),
              React.createElement("th", null, "New Path"),
              React.createElement("th", null, "Status")
            )
          ),
          React.createElement(
            "tbody",
            null,
            pageRows.length
              ? pageRows.map((r) =>
                  React.createElement(
                    "tr",
                    { key: r.id },
                    React.createElement(
                      "td",
                      null,
                      React.createElement("input", {
                        type: "checkbox",
                        checked: selected.has(r.id),
                        disabled: !!r.undone,
                        onChange: (e) => toggleOne(r.id, e.target.checked),
                      })
                    ),
                    React.createElement("td", { className: "font-monospace" }, r.created_at || ""),
                    React.createElement("td", null, String(r.scene_id || "")),
                    React.createElement(
                      "td",
                      {
                        className: "text-truncate font-monospace",
                        style: { maxWidth: "360px" },
                        title: r.old_path || "",
                      },
                      r.old_path || ""
                    ),
                    React.createElement(
                      "td",
                      {
                        className: "text-truncate font-monospace",
                        style: { maxWidth: "360px" },
                        title: r.new_path || "",
                      },
                      r.new_path || ""
                    ),
                    React.createElement(
                      "td",
                      null,
                      r.undone
                        ? React.createElement("span", { className: "badge badge-success" }, "Undone")
                        : React.createElement("span", { className: "badge badge-secondary" }, "Rename")
                    )
                  )
                )
              : React.createElement(
                  "tr",
                  null,
                  React.createElement(
                    "td",
                    { colSpan: 6, className: "text-center text-muted" },
                    loading ? "Loading..." : "No rename operations found."
                  )
                )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "d-flex align-items-center" },
        React.createElement(
          "label",
          { className: "mb-0 mr-2" },
          "Rows"
        ),
        React.createElement(
          "select",
          {
            className: "form-control form-control-sm",
            style: { width: "90px" },
            value: pageSize,
            onChange: (e) => {
              setPageSize(Number(e.target.value) || 25);
              setPage(1);
            },
          },
          [10, 25, 50, 100].map((n) =>
            React.createElement("option", { key: n, value: n }, n)
          )
        ),
        React.createElement(
          Button,
          {
            className: "ml-3",
            variant: "secondary",
            disabled: page <= 1,
            onClick: () => setPage((p) => Math.max(1, p - 1)),
          },
          "Prev"
        ),
        React.createElement(
          "span",
          { className: "mx-2" },
          `Page ${page} / ${totalPages}`
        ),
        React.createElement(
          Button,
          {
            variant: "secondary",
            disabled: page >= totalPages,
            onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
          },
          "Next"
        )
      )
    );
  };

  const TemplateHelpPage = () => {
    const [sceneFields, setSceneFields] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState("");

    const loadSelectors = async () => {
      setLoading(true);
      setStatus("Loading selectors...");
      try {
        const data = await gql(
          `query IntrospectType($typeName: String!) {
            __type(name: $typeName) {
              fields { name }
            }
          }`,
          { typeName: "Scene" }
        );
        const fields = ((data && data.__type && data.__type.fields) || [])
          .map((f) => f && f.name)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b));
        setSceneFields(fields);
        setStatus(`Loaded ${fields.length} scene selectors.`);
      } catch (e) {
        setStatus(`Error: ${e?.message || String(e)}`);
      } finally {
        setLoading(false);
      }
    };

    React.useEffect(() => {
      loadSelectors();
    }, []);

    return React.createElement(
      "div",
      { className: "container-fluid" },
      React.createElement("h1", null, "Scene Renamer"),
      React.createElement("hr", null),
      React.createElement(SceneRenamerTopTabs, null),
      React.createElement("h3", null, "Template Help"),
      React.createElement(
        "p",
        { className: "mb-2" },
        "Template examples: $scene.title, $scene.date, $scene.year, $scene.groups[0].scene_index, $scene.groups[0].group.name"
      ),
      React.createElement(
        "p",
        { className: "mb-2" },
        "Conditional blocks: text inside { ... } is rendered only when all tags inside resolve."
      ),
      React.createElement(
        "div",
        { className: "mb-3" },
        React.createElement(
          Button,
          { onClick: loadSelectors, disabled: loading },
          loading ? "Refreshing..." : "Refresh Selectors"
        ),
        React.createElement(
          "span",
          { className: "ml-3" },
          status
        )
      ),
      React.createElement("h5", null, "Scene Selectors"),
      React.createElement(
        "div",
        {
          className: "border rounded p-3",
          style: { maxHeight: "520px", overflow: "auto" },
        },
        sceneFields.length
          ? React.createElement(
              "ul",
              { className: "mb-0" },
              sceneFields.map((f) =>
                React.createElement(
                  "li",
                  { key: f, className: "font-monospace" },
                  `$scene.${f}`
                )
              )
            )
          : React.createElement(
              "div",
              { className: "text-muted" },
              loading ? "Loading..." : "No selectors loaded."
            )
      )
    );
  };

  PluginApi.register.route("/scene-renamer-undo", UndoPage);
  PluginApi.register.route("/scene-renamer-help", TemplateHelpPage);

  console.log("Scene Renamer Undo/Help UI loaded");
})();
