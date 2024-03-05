import { Image } from "~/libs/components/components.js";
import { type CourseDto } from "~/modules/courses/courses.js";
import { type UserCourseResponseDto } from "~/modules/user-courses/user-courses.js";

import { LinearProgress } from "../../../../linear-progress/linear-progress.js";
import styles from "./styles.module.css";

type Properties = {
	course: CourseDto | UserCourseResponseDto;
};

const isUserCourse = (
	dto: CourseDto | UserCourseResponseDto,
): dto is UserCourseResponseDto => {
	return "progress" in dto;
};

const CourseCard: React.FC<Properties> = ({ course }: Properties) => {
	const { image, title, vendor } = course;

	const { progress } = isUserCourse(course) ? course : { progress: null };
	const percentage = progress;

	return (
		<div className={styles["content"]}>
			<div className={styles["source-container"]}>
				<Image alt="Course source logo" src={`/vendors/${vendor.key}.svg`} />
			</div>
			<div className={styles["image-container"]}>
				<Image alt="Course" src={image} />
			</div>
			<div className={styles["info-container"]}>
				<h2 className={styles["title"]}>{title}</h2>

				{isUserCourse(course) && (
					<div className={styles["progress"]}>
						<LinearProgress progress={percentage as number} />
						<p className={styles["progress-info"]}>Completed {percentage}%</p>
					</div>
				)}
			</div>
		</div>
	);
};

export { CourseCard };
