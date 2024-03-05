import { Courses, Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as userCourseActions } from "~/modules/user-courses/user-courses.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { AddCourseModal, WelcomeHeader } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Overview: React.FC = () => {
	const { isLoading, user, userCourses } = useAppSelector((state) => {
		return {
			isLoading: state.userCourses.dataStatus === DataStatus.PENDING,
			user: state.auth.user as UserAuthResponseDto,
			userCourses: state.userCourses.myCourses,
		};
	});
	const dispatch = useAppDispatch();
	const [isAddCourseModalOpen, setIsAddCourseModalOpen] =
		useState<boolean>(false);

	const handleModalOpen = useCallback(() => {
		setIsAddCourseModalOpen(true);
	}, [setIsAddCourseModalOpen]);
	const handleModalClose = useCallback(() => {
		setIsAddCourseModalOpen(false);
	}, [setIsAddCourseModalOpen]);

	useEffect(() => {
		void dispatch(
			userCourseActions.loadMyCourses({
				id: user.id,
				search: "",
			}),
		);
	}, [dispatch, user]);

	return (
		<div className={styles["container"]}>
			<WelcomeHeader onAddCourseClick={handleModalOpen} user={user} />
			<div className={styles["courses-container"]}>
				<h2 className={styles["courses-title"]}>Courses</h2>
				{isLoading ? (
					<Loader color="orange" size="large" />
				) : (
					<Courses userCourses={userCourses} userId={user.id} />
				)}
			</div>
			{isAddCourseModalOpen && <AddCourseModal onClose={handleModalClose} />}
		</div>
	);
};

export { Overview };
