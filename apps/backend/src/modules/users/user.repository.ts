import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

import { type UserProfileRequestDto } from "./libs/types/types.js";
import { type UserDetailsModel } from "./user-details.model.js";

class UserRepository implements Repository<UserEntity> {
	private userDetailsModel: typeof UserDetailsModel;
	private userModel: typeof UserModel;
	public constructor(
		userModel: typeof UserModel,
		userDetailsModel: typeof UserDetailsModel,
	) {
		this.userModel = userModel;
		this.userDetailsModel = userDetailsModel;
	}

	public async addAvatar(id: number, fileId: number): Promise<void> {
		await this.userDetailsModel
			.query()
			.where("userId", id)
			.patch({ avatarFileId: fileId })
			.execute();
	}

	public async create(entity: UserEntity): Promise<UserEntity> {
		const { email, firstName, lastName, passwordHash, passwordSalt } =
			entity.toNewObject();

		const user = await this.userModel
			.query()
			.insert({
				email,
				passwordHash,
				passwordSalt,
			})
			.returning("*")
			.execute();
		const userDetails = await this.userDetailsModel
			.query()
			.insert({ firstName, lastName, userId: user.id })
			.returning("*")
			.execute();

		return UserEntity.initialize({
			avatarUrl: null,
			createdAt: user.createdAt,
			email: user.email,
			firstName: userDetails.firstName,
			hasUnreadNotifications: false,
			id: user.id,
			lastName: userDetails.lastName,
			nickname: null,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
		});
	}

	public async delete(userId: number): Promise<boolean> {
		return Boolean(await this.userModel.query().deleteById(userId).execute());
	}

	public async find(userId: number): Promise<UserEntity | null> {
		const user = await this.userModel
			.query()
			.select(
				"*",
				this.userModel
					.relatedQuery(RelationName.NOTIFICAIONS)
					.where("status", "=", "unread")
					.count()
					.as("unreadNotificationsCount"),
			)
			.findById(userId)
			.withGraphJoined(
				`${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.execute();

		return user
			? UserEntity.initialize({
					avatarUrl: user.userDetails.avatarFile?.url ?? null,
					createdAt: user.createdAt,
					email: user.email,
					firstName: user.userDetails.firstName,
					hasUnreadNotifications: Boolean(
						Number(user.unreadNotificationsCount),
					),
					id: user.id,
					lastName: user.userDetails.lastName,
					nickname: user.userDetails.nickname,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
				})
			: null;
	}

	public async findAll(): Promise<UserEntity[]> {
		const users = await this.userModel
			.query()
			.withGraphJoined(
				`${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.execute();

		return users.map((user) =>
			UserEntity.initialize({
				avatarUrl: user.userDetails.avatarFile?.url ?? null,
				createdAt: user.createdAt,
				email: user.email,
				firstName: user.userDetails.firstName,
				hasUnreadNotifications: false,
				id: user.id,
				lastName: user.userDetails.lastName,
				nickname: user.userDetails.nickname,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				updatedAt: user.updatedAt,
			}),
		);
	}

	public async findById(id: number): Promise<UserEntity | null> {
		const user = await this.userModel
			.query()
			.select(
				"*",
				this.userModel
					.relatedQuery(RelationName.NOTIFICAIONS)
					.where("status", "=", "unread")
					.count()
					.as("unreadNotificationsCount"),
			)
			.findById(id)
			.withGraphJoined(
				`${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.execute();

		return user
			? UserEntity.initialize({
					avatarUrl: user.userDetails.avatarFile?.url ?? null,
					createdAt: user.createdAt,
					email: user.email,
					firstName: user.userDetails.firstName,
					hasUnreadNotifications: Boolean(
						Number(user.unreadNotificationsCount),
					),
					id: user.id,
					lastName: user.userDetails.lastName,
					nickname: user.userDetails.nickname,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
				})
			: null;
	}

	public async getByEmail(email: string): Promise<UserEntity | null> {
		const user = await this.userModel
			.query()
			.select(
				"*",
				this.userModel
					.relatedQuery(RelationName.NOTIFICAIONS)
					.where("status", "=", "unread")
					.count()
					.as("unreadNotificationsCount"),
			)
			.findOne({ email })
			.withGraphJoined(
				`${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.execute();

		return user
			? UserEntity.initialize({
					avatarUrl: user.userDetails.avatarFile?.url ?? null,
					createdAt: user.createdAt,
					email: user.email,
					firstName: user.userDetails.firstName,
					hasUnreadNotifications: Boolean(
						Number(user.unreadNotificationsCount),
					),
					id: user.id,
					lastName: user.userDetails.lastName,
					nickname: user.userDetails.nickname,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
				})
			: null;
	}

	public async getByNickname(
		nickname: null | string,
	): Promise<UserEntity | null> {
		const hasNickname = Boolean(nickname);

		if (!hasNickname) {
			return null;
		}

		const user = await this.userModel
			.query()
			.findOne({ nickname })
			.withGraphJoined(
				`${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.execute();

		return user
			? UserEntity.initialize({
					avatarUrl: user.userDetails.avatarFile?.url ?? null,
					createdAt: user.createdAt,
					email: user.email,
					firstName: user.userDetails.firstName,
					hasUnreadNotifications: false,
					id: user.id,
					lastName: user.userDetails.lastName,
					nickname: user.userDetails.nickname,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
				})
			: null;
	}
	public async update(
		userId: number,
		data: UserProfileRequestDto,
	): Promise<UserEntity | null> {
		const userDetails = await this.userDetailsModel
			.query()
			.findOne({ userId: userId })
			.castTo<UserDetailsModel>();

		await this.userDetailsModel.query().patchAndFetchById(userDetails.id, {
			firstName: data.firstName,
			lastName: data.lastName,
			nickname: data.nickname,
		});

		const user = await this.userModel
			.query()
			.select(
				"*",
				this.userModel
					.relatedQuery(RelationName.NOTIFICAIONS)
					.where("status", "=", "unread")
					.count()
					.as("unreadNotificationsCount"),
			)
			.findById(userId)
			.withGraphJoined(
				`${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.execute();

		return user
			? UserEntity.initialize({
					avatarUrl: user.userDetails.avatarFile?.url ?? null,
					createdAt: user.createdAt,
					email: user.email,
					firstName: user.userDetails.firstName,
					hasUnreadNotifications: Boolean(
						Number(user.unreadNotificationsCount),
					),
					id: user.id,
					lastName: user.userDetails.lastName,
					nickname: user.userDetails.nickname,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
				})
			: null;
	}
}

export { UserRepository };
