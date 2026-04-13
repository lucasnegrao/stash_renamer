import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { PatchComponent } from "../../patch";
const React = window.PluginApi.React;

export const Icon: React.FC<FontAwesomeIconProps> = function (props) {
  return <FontAwesomeIcon {...props} className={`fa-icon ${props.className ?? ""}`} />;
};
