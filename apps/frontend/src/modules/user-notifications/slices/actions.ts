import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { type NotificationFilter } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig, type ValueOf } from "~/libs/types/types.js";

import {
	type AllNotificationsResponseDto,
	type ReadNotificationsRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./user-notifications.slice.js";

const getUserNotifications = createAsyncThunk<
	AllNotificationsResponseDto,
	{
		search: string | undefined;
		type: ValueOf<typeof NotificationFilter> | null;
	},
	AsyncThunkConfig
>(`${sliceName}/get-user-notifications`, ({ search, type }, { extra }) => {
	const { userNotificationsApi } = extra;

	return userNotificationsApi.getUserNotifications({ search, type });
});

const getUnreadNotificationCount = createAsyncThunk<
	number,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-unread-notification-count`, (_, { extra }) => {
	const { userNotificationsApi } = extra;

	return userNotificationsApi.getUnreadNotificationCount();
});

const setReadNotifications = createAsyncThunk<
	AllNotificationsResponseDto,
	ReadNotificationsRequestDto,
	AsyncThunkConfig
>(
	`${sliceName}/set-read-notifications`,
	async (payload, { dispatch, extra }) => {
		const { userNotificationsApi } = extra;

		const readNotifications =
			await userNotificationsApi.setReadNotifications(payload);

		void dispatch(getUnreadNotificationCount());

		return readNotifications;
	},
);

const joinRoom = createAction(`${sliceName}/join-room`, (userId: string) => {
	return {
		payload: userId,
	};
});

const leaveRoom = createAction(`${sliceName}/leave-room`, (userId: string) => {
	return {
		payload: userId,
	};
});

export {
	getUnreadNotificationCount,
	getUserNotifications,
	joinRoom,
	leaveRoom,
	setReadNotifications,
};
