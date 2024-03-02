import { Button, Image, Link } from "~/libs/components/components.js";
import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { SearchBar } from "../search-bar/search-bar.js";
import styles from "./styles.module.css";

const Header: React.FC = () => {
	const { hasUnreadNotifications, user } = useAppSelector(({ auth }) => {
		return {
			hasUnreadNotifications: auth.hasUnreadNotifications,
			user: auth.user as UserAuthResponseDto,
		};
	});

	return (
		<header className={styles["header"]}>
			<div className={styles["toolbar"]}>
				<SearchBar />
				<nav>
					<ul className={styles["navbar"]}>
						<li>
							<Button
								className={styles["icon-button"]}
								hasVisuallyHiddenLabel
								href={AppRoute.CHATS}
								iconName="chats"
								label="To chats"
							/>
						</li>
						<li>
							<Button
								className={getValidClassNames(
									styles["icon-button"],
									hasUnreadNotifications && styles["unread"],
								)}
								hasVisuallyHiddenLabel
								href={AppRoute.NOTIFICATIONS}
								iconName="notification"
								label="Notifications"
							/>
						</li>
						<li>
							<Link to={AppRoute.PROFILE}>
								<Image
									alt="user-avatar"
									className={styles["image"]}
									height="48"
									shape="circle"
									src={user.avatarUrl ?? DEFAULT_USER_AVATAR}
									width="48"
								/>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export { Header };
