import { NavLink } from "react-router-dom";

import { type AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	activeClassName?: string | undefined;
	children: React.ReactNode;
	className?: string | undefined;
	isDisabled?: boolean;
	to: ValueOf<typeof AppRoute>;
};

const Link: React.FC<Properties> = ({
	activeClassName,
	children,
	className,
	isDisabled,
	to,
}: Properties) => {
	const handleLinkStyles = useCallback(
		({ isActive }: { isActive: boolean }): string => {
			return getValidClassNames(
				isActive && activeClassName,
				className,
				styles["link"],
			);
		},
		[activeClassName, className],
	);

	const onClick = useCallback(
		(event: React.MouseEvent): void => {
			if (isDisabled) {
				event.preventDefault();
			}
		},
		[isDisabled],
	);

	return (
		<NavLink className={handleLinkStyles} onClick={onClick} to={to}>
			{children}
		</NavLink>
	);
};

export { Link };
