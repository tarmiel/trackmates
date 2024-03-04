import { EMPTY_ARRAY_LENGTH } from "~/libs/constants/constants.js";
import { initDebounce } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	type NotificationResponseDto,
	actions,
} from "~/modules/user-notifications/user-notifications.js";

import { READ_NOTIFICATIONS_DELAY_MS } from "../../constants/constants.js";
import { NotificationListItem } from "../notification-list-item/notification-list-item.js";
import styles from "./styles.module.css";

type Properties = {
	notifications: NotificationResponseDto[];
};

const NotificationList: React.FC<Properties> = ({
	notifications,
}: Properties) => {
	const [readNotificationIds, setReadNotificationIds] = useState<number[]>([]);
	const dispatch = useAppDispatch();

	const handleRead = useCallback(
		(notificationId: number): void => {
			setReadNotificationIds((previous) => {
				return [...previous, notificationId];
			});
		},
		[setReadNotificationIds],
	);

	const setReadNotifications = (): void => {
		void dispatch(
			actions.setReadNotifications({ notificationIds: readNotificationIds }),
		);
	};

	const setReadNotificationsDebounced = initDebounce(
		setReadNotifications,
		READ_NOTIFICATIONS_DELAY_MS,
	);

	useEffect(() => {
		if (readNotificationIds.length > EMPTY_ARRAY_LENGTH) {
			setReadNotificationsDebounced();

			return () => {
				setReadNotificationsDebounced.clear();
			};
		}
	}, [readNotificationIds, setReadNotificationsDebounced]);

	return (
		<ul className={styles["notification-list"]}>
			{notifications.map((notification) => (
				<NotificationListItem
					key={notification.id}
					notification={notification}
					onRead={handleRead}
				/>
			))}
		</ul>
	);
};

export { NotificationList };
