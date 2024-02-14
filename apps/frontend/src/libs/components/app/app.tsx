import reactLogo from "~/assets/img/react.svg";
import {
	Link,
	Loader,
	RouterOutlet,
	Sidebar,
} from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { checkIfSidebarIsShown } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { actions as userActions } from "~/modules/users/users.js";

import styles from "./styles.module.css";

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
			<img alt="logo" className="App-logo" src={reactLogo} width="30" />

			<ul className="App-navigation-list">
				<li>
					<Link to={AppRoute.ROOT}>Root</Link>
				</li>
				<li>
					<Link to={AppRoute.SIGN_IN}>Sign in</Link>
				</li>
				<li>
					<Link to={AppRoute.SIGN_UP}>Sign up</Link>
				</li>
			</ul>
			<p>Current path: {pathname}</p>

			{checkIfSidebarIsShown(pathname) ? (
				<div className={styles["page-layout"]}>
					<Sidebar className={styles["sidebar"] ?? ""} />
					<div className={styles["page"]}>
						<RouterOutlet />
					</div>
				</div>
			) : (
				<div>
					<RouterOutlet />
				</div>
			)}

			{isRoot && (
				<>
					<h2>Users:</h2>
					<h3>Status: {dataStatus}</h3>
					{dataStatus === DataStatus.PENDING && (
						<Loader color="orange" size="large" />
					)}
					<ul>
						{users.map((user) => (
							<li key={user.id}>{user.email}</li>
						))}
					</ul>
				</>
			)}
		</>
	);
};

export { App };
