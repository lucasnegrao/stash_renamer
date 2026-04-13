import type * as React from "react";

type AnyComponent = React.ComponentType<any>;

declare interface PluginApiShape {
  React: typeof React;
  ReactDOM?: {
    createPortal?: (children: React.ReactNode, container: Element | DocumentFragment) => React.ReactNode;
  };
  GQL: Record<string, any>;
  Event: {
    addEventListener: (event: string, callback: (e: CustomEvent) => void) => void;
  };
  libraries: {
    ReactRouterDOM: {
      Link: AnyComponent;
      Route: AnyComponent;
      NavLink: AnyComponent;
    };
    Bootstrap: {
      Button: AnyComponent;
      ButtonGroup: AnyComponent;
      Badge: AnyComponent;
      Collapse: AnyComponent;
      Form: {
        Control: AnyComponent;
      };
      Spinner: AnyComponent;
      Table: AnyComponent;
      Nav: AnyComponent & {
        Link: AnyComponent;
        Item: AnyComponent;
      };
      Tab: AnyComponent & {
        Pane: AnyComponent;
      };
    };
    FontAwesomeSolid: Record<string, any>;
    Intl: {
      FormattedMessage: AnyComponent;
      FormattedNumber: AnyComponent;
      useIntl: () => any;
    };
    ReactSelect: Record<string, any>;
  };
  loadableComponents: Record<string, any>;
  components: Record<string, AnyComponent>;
  utils: Record<string, any>;
  hooks: Record<string, any>;
  patch: {
    before: (target: string, fn: Function) => void;
    instead: (target: string, fn: Function) => void;
    after: (target: string, fn: Function) => void;
  };
  register: {
    route: (path: string, component: AnyComponent) => void;
  };
}

declare global {
  interface Window {
    PluginApi: PluginApiShape;
  }
}

export {};
