import cx from "classnames";
const PluginApi = window.PluginApi;
const React = PluginApi.React;
export const TagItem: React.FC = (props: any) => {

const { Badge } = PluginApi.libraries.Bootstrap;
  const { className, children, ...others } = props;
  return (
    <Badge
      className={cx("tag-item", className)}
      variant="secondary"
      {...others}
    >
      {children}
    </Badge>
  );
};

