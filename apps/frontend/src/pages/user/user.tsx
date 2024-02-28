import {
	Button,
	Courses,
	Image,
	Loader,
	Navigate,
} from "~/libs/components/components.js";
import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useParams,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as friendsActions } from "~/modules/friends/friends.js";
import { actions as userCoursesActions } from "~/modules/user-courses/user-courses.js";
import {
	type UserAuthResponseDto,
	actions as usersActions,
} from "~/modules/users/users.js";

import styles from "./styles.module.css";

const User: React.FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const userId = Number(id);
	const { courses, currentUserId, isCoursesLoading, user, userNotFound } =
		useAppSelector((state) => {
			return {
				courses: state.userCourses.userCourses,
				currentUserId: (state.auth.user as UserAuthResponseDto).id,
				isCoursesLoading: state.userCourses.dataStatus === DataStatus.PENDING,
				user: state.users.user,
				userNotFound: state.users.dataStatus === DataStatus.REJECTED,
			};
		});

	const [isFollowing, setIsFollowing] = useState<boolean>(
		useAppSelector((state) =>
			state.friends.followings.some((friend) => friend.id === userId),
		),
	);
	const handleFollow = useCallback(() => {
		void dispatch(friendsActions.follow({ id: userId }))
			.unwrap()
			.then(() => {
				setIsFollowing(true);
			});
	}, [dispatch, userId]);

	const handleUnfollow = useCallback(() => {
		void dispatch(friendsActions.unfollow({ id: userId }))
			.unwrap()
			.then(() => {
				setIsFollowing(false);
			});
	}, [dispatch, userId]);

	useEffect(() => {
		void dispatch(usersActions.getById(userId));
		void dispatch(userCoursesActions.loadUserCourses(userId));
	}, [dispatch, userId]);

	const hasUser = Boolean(user);

	if (userNotFound || currentUserId === userId) {
		return <Navigate to={AppRoute.FRIENDS} />;
	}

	if (!hasUser) {
		return <Loader color="orange" size="large" />;
	}

	const userObject = user as UserAuthResponseDto;

	return (
		<div className={styles["container"]}>
			<Button
				className={styles["return-button"]}
				hasVisuallyHiddenLabel
				href={AppRoute.FRIENDS}
				iconName="back"
				label="Go back"
				size="small"
			/>

			<div className={styles["user-content"]}>
				<div className={styles["profile-image-wrapper"]}>
					<Image
						alt="avatar"
						className={styles["profile-image"]}
						src={userObject.avatarUrl ?? DEFAULT_USER_AVATAR}
					/>
				</div>

				<div className={styles["user-wrapper"]}>
					<p className={styles["fullName"]}>
						{userObject.firstName} {userObject.lastName}
					</p>
					<Button
						iconName={isFollowing ? "cross" : "add"}
						label={isFollowing ? "Following" : "Follow"}
						onClick={isFollowing ? handleUnfollow : handleFollow}
						size="small"
						style="primary"
					/>
				</div>
			</div>

			<div className={styles["courses-container"]}>
				<h2 className={styles["courses-title"]}>Courses</h2>
				{isCoursesLoading ? (
					<Loader color="orange" size="large" />
				) : (
					<Courses courses={courses} />
				)}
			</div>
		</div>
	);
};

export { User };
