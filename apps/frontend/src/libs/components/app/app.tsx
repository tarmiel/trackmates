import { RouterOutlet } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useNavigate,
} from "~/libs/hooks/hooks.js";
import { actions as appActions } from "~/libs/slices/app/app.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { actions as chatActions } from "~/modules/chats/chats.js";
import { actions as userNotificationsActions } from "~/modules/user-notifications/user-notifications.js";

import { Loader } from "../loader/loader.js";

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { authDataStatus, redirectTo, user } = useAppSelector(
		({ app, auth }) => ({
			authDataStatus: auth.dataStatus,
			redirectTo: app.redirectTo,
			user: auth.user,
		}),
	);

	useEffect(() => {
		void dispatch(authActions.getAuthenticatedUser());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			void dispatch(userNotificationsActions.getUnreadNotificationCounter());
			void dispatch(chatActions.getUnreadMessageCounter());
		}
	}, [dispatch, user]);

	useEffect(() => {
		if (redirectTo) {
			navigate(redirectTo);
			dispatch(appActions.navigate(null));
		}
	}, [dispatch, navigate, redirectTo]);

	useEffect(() => {
		if (user) {
			void dispatch(chatActions.joinRoom(String(user.id)));
			void dispatch(userNotificationsActions.joinRoom(String(user.id)));

			return () => {
				void dispatch(chatActions.leaveRoom(String(user.id)));
				void dispatch(userNotificationsActions.leaveRoom(String(user.id)));
			};
		}
	}, [dispatch, user]);

	if (
		authDataStatus === DataStatus.IDLE ||
		authDataStatus === DataStatus.PENDING
	) {
		return <Loader color="orange" size="large" />;
	}

	return (
		<>
			<RouterOutlet />
		</>
	);
};

export { App };
