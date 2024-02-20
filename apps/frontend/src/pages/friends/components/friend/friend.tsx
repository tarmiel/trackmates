import { Button, Image } from "~/libs/components/components.js";
import { type FriendDto } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	friend: FriendDto;
};

const Friend: React.FC<Properties> = ({ friend }: Properties) => {
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

			<div className={styles["actions"]}>
				<Button
					className={styles["add-friend-action"]}
					color="secondary"
					iconName="add"
					label="Follow"
					size="small"
				/>
			</div>
		</article>
	);
};

export { Friend };
