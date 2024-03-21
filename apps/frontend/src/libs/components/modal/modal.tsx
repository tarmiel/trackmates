import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useHandleClickOutside,
	useHandleEscPress,
	useRef,
	useScrollDisabled,
} from "~/libs/hooks/hooks.js";

import { Button } from "../button/button.js";
import { Portal } from "../portal/portal.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	className?: string | undefined;
	isCentered?: boolean;
	isOpen: boolean;
	onClose: () => void;
};

const Modal: React.FC<Properties> = ({
	children,
	className,
	isCentered = false,
	isOpen,
	onClose,
}: Properties) => {
	const contentReference = useRef<HTMLDivElement | null>(null);
	useHandleClickOutside({
		onClick: onClose,
		ref: contentReference,
	});

	useHandleEscPress({
		onEscPress: onClose,
	});

	const modalStyles = getValidClassNames(
		styles["modal"],
		isCentered && styles["centered"],
		isOpen && styles["active"],
	);

	useScrollDisabled(isOpen);

	return (
		<Portal>
			<dialog aria-modal className={modalStyles} open={isOpen}>
				<div
					className={getValidClassNames(styles["content"], className)}
					ref={contentReference}
					role="button"
					tabIndex={0}
				>
					{children}
					<Button
						className={styles["close-btn"]}
						hasVisuallyHiddenLabel
						iconName="cross"
						label="Close modal"
						onClick={onClose}
						style="plain"
					/>
				</div>
			</dialog>
		</Portal>
	);
};

export { Modal };
