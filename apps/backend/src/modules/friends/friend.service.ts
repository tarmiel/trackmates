import { type FriendRepository } from "~/modules/friends/friend.repository.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import {
	FriendError,
	FriendErrorMessage,
	HTTPCode,
} from "./libs/enums/enums.js";

class FriendService {
	private friendRepository: FriendRepository;

	public constructor(friendRepository: FriendRepository) {
		this.friendRepository = friendRepository;
	}

	public async createSubscription(
		followerUserId: number,
		followingUserId: number,
	): Promise<UserAuthResponseDto | null> {
		if (followerUserId === followingUserId) {
			throw new FriendError(
				FriendErrorMessage.FRIEND_SEND_REQUEST_TO_YOURSELF,
				HTTPCode.BAD_REQUEST,
			);
		}

		const isSubscriptionExist =
			await this.friendRepository.getIsSubscribedByRequestId(
				followerUserId,
				followingUserId,
			);

		if (!isSubscriptionExist) {
			const followingUser = await this.friendRepository.create({
				followerUserId,
				followingUserId,
			});

			return followingUser?.toObject() ?? null;
		}

		throw new FriendError(
			FriendErrorMessage.FRIEND_IS_ALREADY_FOLLOWING,
			HTTPCode.BAD_REQUEST,
		);
	}

	public async delete(id: number): Promise<boolean> {
		const isDeletedSuccess = await this.friendRepository.delete(id);

		if (!isDeletedSuccess) {
			throw new FriendError(
				FriendErrorMessage.FRIEND_UPDATE_ERROR,
				HTTPCode.BAD_REQUEST,
			);
		}

		return isDeletedSuccess;
	}

	public async deleteSubscription(
		id: number,
		userId: number,
	): Promise<boolean> {
		const isFollowingNow =
			await this.friendRepository.getIsSubscribedByRequestId(id, userId);

		if (!isFollowingNow) {
			throw new FriendError(
				FriendErrorMessage.FRIEND_REQUEST_ERROR,
				HTTPCode.BAD_REQUEST,
			);
		}

		const isDeletedSuccess = await this.friendRepository.deleteSubscription(
			id,
			userId,
		);

		if (!isDeletedSuccess) {
			throw new FriendError(
				FriendErrorMessage.FRIEND_UPDATE_ERROR,
				HTTPCode.BAD_REQUEST,
			);
		}

		return isDeletedSuccess;
	}

	public async find(id: number): Promise<UserAuthResponseDto | null> {
		const foundUser = await this.friendRepository.find(id);

		if (!foundUser) {
			throw new FriendError(
				FriendErrorMessage.FRIEND_SEARCH_ERROR,
				HTTPCode.BAD_REQUEST,
			);
		}

		return foundUser.toObject();
	}

	public async findAll(): Promise<UserAuthResponseDto[]> {
		const foundUsers = await this.friendRepository.findAll();

		return foundUsers.map((user) => user.toObject());
	}

	public async getPotentialFollowers(
		id: number,
	): Promise<UserAuthResponseDto[]> {
		const followers = await this.friendRepository.getPotentialFollowers(id);

		return followers.map((user) => user.toObject());
	}

	public async getUserFollowers(id: number): Promise<UserAuthResponseDto[]> {
		const followers = await this.friendRepository.getUserFollowers(id);

		return followers.map((user) => user.toObject());
	}

	public async getUserFollowings(id: number): Promise<UserAuthResponseDto[]> {
		const folowings = await this.friendRepository.getUserFollowings(id);

		return folowings.map((user) => user.toObject());
	}

	public async update(id: number): Promise<UserAuthResponseDto> {
		const updatedUser = await this.friendRepository.update(id);

		return updatedUser.toObject();
	}
}

export { FriendService };
