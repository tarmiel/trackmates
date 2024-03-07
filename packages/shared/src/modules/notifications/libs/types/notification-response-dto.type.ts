import { type ValueOf } from "../../../../libs/types/types.js";
import { type NotificationStatus } from "../enums/enums.js";

type NotificationResponseDto = {
	createdAt: string;
	id: number;
	message: string;
	receiverUserId: number;
	status: ValueOf<typeof NotificationStatus>;
	updatedAt: string;
	userAvatarUrl: null | string;
	userFirstName: string;
	userId: number;
	userLastName: string;
};

export { type NotificationResponseDto };