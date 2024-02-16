import { Loader, RouterOutlet } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { actions as userActions } from "~/modules/users/users.js";

const App: React.FC = () => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const { dataStatus, users } = useAppSelector(({ users }) => ({
		dataStatus: users.dataStatus,
		users: users.users,
	}));

	const isRoot = pathname === AppRoute.ROOT;

	useEffect(() => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
		}
		void dispatch(authActions.getAuthenticatedUser());
	}, [isRoot, dispatch]);

	return (
		<>
			<ul className="visually-hidden">
				{users.map((user) => (
					<li key={user.id}>{user.email}</li>
				))}
			</ul>
			<div>
				{dataStatus === DataStatus.PENDING && (
					<Loader color="orange" size="large" />
				)}
				<RouterOutlet />
			</div>
		</>
	);
};

export { App };
