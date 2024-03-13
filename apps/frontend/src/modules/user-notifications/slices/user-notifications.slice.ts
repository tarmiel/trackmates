import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type NotificationResponseDto } from "../libs/types/types.js";
import {
	getUnreadNotificationsCount,
	getUserNotifications,
	setReadNotifications,
} from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	notifications: NotificationResponseDto[];
	unreadNotificationsCount: number;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	notifications: [],
	unreadNotificationsCount: 0,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getUserNotifications.fulfilled, (state, action) => {
			state.notifications = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getUserNotifications.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getUserNotifications.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(setReadNotifications.fulfilled, (state, action) => {
			state.notifications = state.notifications.map((value) => {
				const updatedNotification = action.payload.items.find(
					(notification) => {
						return notification.id === value.id;
					},
				);

				return updatedNotification ?? value;
			});
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(setReadNotifications.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(getUnreadNotificationsCount.fulfilled, (state, action) => {
			state.unreadNotificationsCount = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getUnreadNotificationsCount.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "user-notifications",
	reducers: {},
});

export { actions, name, reducer };
