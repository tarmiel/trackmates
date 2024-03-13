import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "~/assets/css/styles.css";
import {
	App,
	Notification,
	ProtectedRoute,
	RouterProvider,
	StoreProvider,
} from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { store } from "~/libs/modules/store/store.js";
import { Auth } from "~/pages/auth/auth.jsx";

import { Chats } from "./pages/chats/chats.js";
import { CourseDescription } from "./pages/course-description/course-description.js";
import { CourseProgressComparison } from "./pages/course-progress-comparison/course-progress-comparison.js";
import { Feed } from "./pages/feed/feed.js";
import { Friends } from "./pages/friends/friends.js";
import { NotFound } from "./pages/not-found/not-found.js";
import { Notifications } from "./pages/notifications/notifications.js";
import { Overview } from "./pages/overview/overview.js";
import { Profile } from "./pages/profile/profile.js";
import { User } from "./pages/user/user.js";

createRoot(document.querySelector("#root") as HTMLElement).render(
	<StrictMode>
		<Notification />
		<StoreProvider store={store.instance}>
			<RouterProvider
				routes={[
					{
						children: [
							{
								element: <ProtectedRoute component={<Chats />} />,
								path: AppRoute.CHATS,
							},
							{
								element: <ProtectedRoute component={<Chats />} />,
								path: AppRoute.CHATS_$ID,
							},
							{
								element: <ProtectedRoute component={<Feed />} />,
								path: AppRoute.FEED,
							},
							{
								element: <ProtectedRoute component={<Friends />} />,
								path: AppRoute.FRIENDS,
							},
							{
								element: <ProtectedRoute component={<Friends />} />,
								path: AppRoute.FRIENDS_FOLLOWERS,
							},
							{
								element: <ProtectedRoute component={<Friends />} />,
								path: AppRoute.FRIENDS_FOLLOWINGS,
							},
							{
								element: <ProtectedRoute component={<Notifications />} />,
								path: AppRoute.NOTIFICATIONS,
							},
							{
								element: <ProtectedRoute component={<Overview />} />,
								path: AppRoute.ROOT,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGN_IN,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGN_UP,
							},
							{
								element: <ProtectedRoute component={<Profile />} />,
								path: AppRoute.PROFILE,
							},
							{
								element: <ProtectedRoute component={<CourseDescription />} />,
								path: AppRoute.USERS_$USER_ID_COURSES_$COURSE_ID,
							},
							{
								element: (
									<ProtectedRoute component={<CourseProgressComparison />} />
								),
								path: AppRoute.USERS_$USER_ID_COURSES_$COURSE_ID_COMPARE,
							},
							{
								element: <ProtectedRoute component={<User />} />,
								path: AppRoute.USERS_$ID,
							},
						],
						element: <App />,
						path: AppRoute.ROOT,
					},
					{ element: <NotFound />, path: AppRoute.ANY },
				]}
			/>
		</StoreProvider>
	</StrictMode>,
);
