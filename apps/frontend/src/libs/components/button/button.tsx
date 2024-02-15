import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";

import { Icon } from "../icon/icon.js";
import { type IconName } from "../icon/libs/types/icon-name.type.js";
import { Link } from "../link/link.js";
import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
	color?: "primary";
	hasVisuallyHiddenLabel?: boolean;
	href?: ValueOf<typeof AppRoute>;
	iconName?: IconName;
	label: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	size?: "regular" | "small";
	style?: "filled" | "outlined";
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	className,
	color = "primary",
	hasVisuallyHiddenLabel = false,
	href,
	iconName,
	label,
	onClick,
	size = "regular",
	style = "filled",
	type = "button",
}: Properties) => {
	const buttonStyles = getValidClassNames(
		styles["button"],
		styles[size],
		styles[style],
		styles[color],
		className,
	);

	const icon = iconName ? <Icon name={iconName} /> : null;

	return (
		<>
			{href ? (
				<Link className={buttonStyles} to={href}>
					{icon}
					{!hasVisuallyHiddenLabel && label}
				</Link>
			) : (
				<button className={buttonStyles} onClick={onClick} type={type}>
					{icon}
					{!hasVisuallyHiddenLabel && label}
				</button>
			)}
		</>
	);
};

export { Button };
