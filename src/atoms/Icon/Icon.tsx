import "./Icon.scss";
import { ReactComponent as IconAdvanced } from "../../assets/images/icon-advanced.svg";
import { ReactComponent as IconArcade } from "../../assets/images/icon-arcade.svg";
import { ReactComponent as IconCheckmark } from "../../assets/images/icon-checkmark.svg";
import { ReactComponent as IconPro } from "../../assets/images/icon-pro.svg";
import { ReactComponent as IconThankyou } from "../../assets/images/icon-thank-you.svg";
import { clsx } from "clsx";

type IconProps = {
  type:
    | "IconAdvanced"
    | "IconArcade"
    | "IconCheckmark"
    | "IconPro"
    | "IconThankyou";
  size: "small" | "large";
};

const Icons = {
  IconAdvanced,
  IconArcade,
  IconCheckmark,
  IconPro,
  IconThankyou,
};

export function Icon({ type, size }: IconProps) {
  const iconClass = clsx("icon", size);
  const IconComponent = Icons[type];

  return <IconComponent className={iconClass} />;
}
