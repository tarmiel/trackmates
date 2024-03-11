import { pushNotification } from "~/libs/modules/push-notification/push-notification.js";
import {
	type NotificationResponseDto,
	NotificationStatus,
} from "~/modules/user-notifications/user-notifications.js";

import { notificationTypeToTitle } from "../maps/maps.js";

const sendNotifications = (notifications: NotificationResponseDto[]): void => {
	for (const notification of notifications) {
		if (notification.status === NotificationStatus.UNREAD) {
			void pushNotification.sendNotification({
				message: notificationTypeToTitle[notification.type],
				options: {
					body: notification.message,
					icon: notification.userAvatarUrl ?? "",
				},
			});
		}
	}
};

export { sendNotifications };
