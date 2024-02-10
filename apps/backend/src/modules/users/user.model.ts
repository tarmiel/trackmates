import { Model } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { UserDetailsModel } from "./user-details/user-details.model.js";

class UserModel extends AbstractModel {
	static jsonSchema = {
		properties: {
			email: { type: "string" },
		},
		required: ["email"],
		type: "object",
	};

	public static relationMappings = () => {
		return {
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

	static tableName: string = DatabaseTableName.USERS;

	public passwordHash!: string;

	public passwordSalt!: string;

	public userDetails!: UserDetailsModel;
}

export { UserModel };
