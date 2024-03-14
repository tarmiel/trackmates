import { NotificationFilter, NotificationType } from "../enums/enums.js";

const filterQueryParameterToNotificationType = {
	[NotificationFilter.ALL]: "",
	[NotificationFilter.COMMENTS]: NotificationType.NEW_COMMENT,
	[NotificationFilter.FOLLOWERS]: NotificationType.NEW_FOLLOWER,
	[NotificationFilter.LIKES]: NotificationType.NEW_LIKE,
} as const;

export { filterQueryParameterToNotificationType };