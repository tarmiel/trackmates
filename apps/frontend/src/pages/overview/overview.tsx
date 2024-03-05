import { Courses, Loader, Pagination } from "~/libs/components/components.js";
import { DataStatus, PaginationValue } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	usePagination,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as userCourseActions } from "~/modules/user-courses/user-courses.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { AddCourseModal, WelcomeHeader } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Overview: React.FC = () => {
	const { courses, isLoading, total, user } = useAppSelector((state) => {
		return {
			courses: state.userCourses.myCourses,
			isLoading: state.userCourses.dataStatus === DataStatus.PENDING,
			total: state.userCourses.totalMyCoursesCount,
			user: state.auth.user as UserAuthResponseDto,
		};
	});
	const dispatch = useAppDispatch();
	const [isAddCourseModalOpen, setIsAddCourseModalOpen] =
		useState<boolean>(false);
	const { handlePageChange: handleMyCoursesPageChange, page } = usePagination();

	const handleModalOpen = useCallback(() => {
		setIsAddCourseModalOpen(true);
	}, [setIsAddCourseModalOpen]);
	const handleModalClose = useCallback(() => {
		setIsAddCourseModalOpen(false);
	}, [setIsAddCourseModalOpen]);

	useEffect(() => {
		void dispatch(
			userCourseActions.loadMyCourses({
				count: PaginationValue.DEFAULT_COUNT,
				page,
				search: "",
				userId: user.id,
			}),
		);
	}, [dispatch, user, page]);

	return (
		<div className={styles["container"]}>
			<WelcomeHeader onAddCourseClick={handleModalOpen} user={user} />
			<div className={styles["courses-container"]}>
				<h2 className={styles["courses-title"]}>Courses</h2>
				{isLoading ? (
					<Loader color="orange" size="large" />
				) : (
					<Courses courses={courses} userId={user.id} />
				)}
				<Pagination
					currentPage={page}
					onPageChange={handleMyCoursesPageChange}
					pageSize={PaginationValue.DEFAULT_COUNT}
					totalCount={total}
				/>
			</div>
			{isAddCourseModalOpen && <AddCourseModal onClose={handleModalClose} />}
		</div>
	);
};

export { Overview };
