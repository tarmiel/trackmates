import { Image } from "~/libs/components/components.js";
import { type CourseDto } from "~/modules/courses/courses.js";
import { type UserCourseDto } from "~/modules/user-courses/user-courses.js";

import { LinearProgress } from "../../../../linear-progress/linear-progress.js";
import styles from "./styles.module.css";

type Properties = {
	course: CourseDto | UserCourseDto;
};

const CourseCard: React.FC<Properties> = ({ course }: Properties) => {
	const { image, title, vendor } = course;

	const { progress } = course as UserCourseDto;
	const percentage = progress as number | undefined;

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

				{percentage !== undefined && (
					<div className={styles["progress"]}>
						<LinearProgress progress={percentage} />
						<p className={styles["progress-info"]}>Completed {percentage}%</p>
					</div>
				)}
			</div>
		</div>
	);
};

export { CourseCard };