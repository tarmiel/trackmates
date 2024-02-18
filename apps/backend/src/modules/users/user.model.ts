import { Model } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { CourseModel } from "../courses/course.model.js";
import { UserDetailsModel } from "./user-details/user-details.model.js";

class UserModel extends AbstractModel {
	public static relationMappings = () => {
		return {
			courses: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					through: {
						from: `${DatabaseTableName.COURSES_TO_USERS}.userId`,
						to: `${DatabaseTableName.COURSES_TO_USERS}.courseId`,
					},
					to: `${DatabaseTableName.COURSES}.id`,
				},
				modelClass: CourseModel,
				relation: Model.ManyToManyRelation,
			},
			userDetails: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					to: `${DatabaseTableName.USER_DETAILS}.userId`,
				},
				modelClass: UserDetailsModel,
				relation: Model.HasOneRelation,
			},
		};
	};

	public email!: string;

	public passwordHash!: string;

	public passwordSalt!: string;

	public userDetails!: UserDetailsModel;

	public static override get tableName(): string {
		return DatabaseTableName.USERS;
	}
}

export { UserModel };
