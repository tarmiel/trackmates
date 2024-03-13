import { Fragment } from "react";

import defaultAvatar from "~/assets/img/default-avatar.png";
import { Image, Link } from "~/libs/components/components.js";
import { APIPath, type AppRoute } from "~/libs/enums/enums.js";
import {
	getTimeDistanceFormatDate,
	getValidClassNames,
} from "~/libs/helpers/helpers.js";
import { useEffect, useInView } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type NotificationResponseDto } from "~/modules/user-notifications/user-notifications.js";

import { NotificationStatus } from "../../enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	notification: NotificationResponseDto;
	onRead: (notificationId: number) => void;
};

const NotificationListItem: React.FC<Properties> = ({
	notification,
	onRead,
}: Properties) => {
	const { inView, ref } = useInView();

	const isRead = notification.status === NotificationStatus.READ;

	useEffect(() => {
		if (!isRead && inView) {
			onRead(notification.id);
		}
	}, [inView, isRead, onRead, notification.id]);

	const date = getTimeDistanceFormatDate(notification.createdAt);

	const fullName = `${notification.userFirstName} ${notification.userLastName}`;

	return (
		<li
			className={getValidClassNames(
				styles["notification"],
				!isRead && styles["unread"],
			)}
			ref={ref}
		>
			<Link
				to={
					`${APIPath.USERS}/${notification.userId}` as ValueOf<typeof AppRoute>
				}
			>
				<Image
					alt="avatar"
					className={styles["notification-source-user-avatar"]}
					src={notification.userAvatarUrl ?? defaultAvatar}
				/>
			</Link>
			<div className={styles["text-content"]}>
				<div className={styles["notification-title"]}>
					{notification.message
						.split(new RegExp(`(${fullName})`, "gi"))
						.map((part, index) =>
							part.toLowerCase() === fullName.toLowerCase() ? (
								<span className={styles["full-name"]} key={index}>
									{part}
								</span>
							) : (
								<Fragment key={index}>{part}</Fragment>
							),
						)}
				</div>
				<span className={styles["notification-date"]}>{date}</span>
			</div>
		</li>
	);
};

export { NotificationListItem };
