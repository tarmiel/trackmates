import { Button, Image } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type Friend as TFriend } from "~/libs/types/types.js";

import { useFriendInteractions } from "../../hooks/hooks.js";
import styles from "./styles.module.css";

type Properties = {
	friend: TFriend;
};

const Friend: React.FC<Properties> = ({ friend }: Properties) => {
	const { acceptRequest, denyRequest, sendRequest } =
		useFriendInteractions(friend);

	const buttonStyles = styles["button"];

	const actionsMapping: Record<TFriend["status"], React.ReactNode> = {
		friend: <p className={styles["info"]}>You are friends</p>,
		invited: (
			<>
				<Button
					className={buttonStyles}
					color="success"
					iconName="check"
					label="Accept"
					onClick={acceptRequest}
					size="small"
					type="button"
				/>
				<Button
					className={buttonStyles}
					color="danger"
					iconName="cross"
					label="Deny"
					onClick={denyRequest}
					size="small"
				/>
			</>
		),
		requested: <p className={styles["info"]}>Request sent</p>,
		unknown: (
			<Button
				className={buttonStyles}
				color="secondary"
				iconName="add"
				label="Add friend"
				onClick={sendRequest}
				size="small"
			/>
		),
	};

	return (
		<article className={styles["card"]}>
			<div className={styles["card-content"]}>
				<Image
					alt={`portrait of ${friend.fullName}`}
					className={styles["portrait"]}
					src={friend.imageUrl}
				/>
				<p className={styles["fullName"]}>{friend.fullName}</p>
			</div>

			<div
				className={getValidClassNames(
					styles["actions"],
					status === "invited" ? styles["actions-invited"] : "",
				)}
			>
				{actionsMapping[friend.status]}
			</div>
		</article>
	);
};

export { Friend };
