import { type Service } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import {
	type UserAuthResponseDto,
	type UserGetAllResponseDto,
	type UserSignUpRequestDto,
} from "./libs/types/types.js";

class UserService implements Service {
	private userRepository: UserRepository;

	public constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	public async create(
		payload: UserSignUpRequestDto,
	): Promise<UserAuthResponseDto> {
		const item = await this.userRepository.create(
			UserEntity.initializeNew({
				createdAt: "",
				email: payload.email,
				passwordHash: "HASH", // TODO
				passwordSalt: "SALT", // TODO
				updatedAt: "",
			}),
		);

		return item.toObject();
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Service["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<UserGetAllResponseDto> {
		const items = await this.userRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public async getAuthenticatedUser(
		id: number,
	): Promise<UserAuthResponseDto | null> {
		const user = await this.userRepository.findById(id);

		return user?.toObject() ?? null;
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { UserService };
