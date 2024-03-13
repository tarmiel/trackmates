import { HTTPCode } from "~/libs/enums/enums.js";
import { type Service } from "~/libs/types/types.js";

import {
	type AllPermissionsResponseDto,
	type PermissionService,
} from "../permissions/permissions.js";
import { type UserService } from "../users/users.js";
import { GroupEntity } from "./group.entity.js";
import { type GroupRepository } from "./group.repository.js";
import { GroupErrorMessage } from "./libs/enums/enums.js";
import { GroupError } from "./libs/exceptions/exceptions.js";
import {
	type AllGroupsResponseDto,
	type GroupRequestDto,
	type GroupResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	groupRepository: GroupRepository;
	permissionService: PermissionService;
	userService: UserService;
};

class GroupService implements Service {
	private groupRepository: GroupRepository;
	private permissionService: PermissionService;
	private userService: UserService;

	public constructor({
		groupRepository,
		permissionService,
		userService,
	}: Constructor) {
		this.groupRepository = groupRepository;
		this.permissionService = permissionService;
		this.userService = userService;
	}

	public async create(group: GroupRequestDto): Promise<GroupResponseDto> {
		const { key, name } = group;
		const groupByKey = await this.groupRepository.findByKey(key);
		const groupByName = await this.groupRepository.findByName(name);

		if (groupByKey || groupByName) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_ALREADY_EXISTS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const createdGroup = await this.groupRepository.create(
			GroupEntity.initializeNew({ key, name }),
		);

		return createdGroup.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		const groupById = await this.groupRepository.find(id);

		if (!groupById) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.groupRepository.delete(id);
	}

	public async find(id: number): Promise<GroupResponseDto> {
		const groupById = await this.groupRepository.find(id);

		if (!groupById) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return groupById.toObject();
	}

	public async findAll(): Promise<AllGroupsResponseDto> {
		const groups = await this.groupRepository.findAll();

		return {
			items: groups.map((group) => {
				return group.toObject();
			}),
		};
	}

	public async findAllPermissionsInGroup(
		groupId: number,
	): Promise<AllPermissionsResponseDto> {
		const groupById = await this.groupRepository.find(groupId);

		if (!groupById) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const permissionsInGroup =
			await this.groupRepository.findAllPermissionsInGroup(groupId);

		return {
			items: permissionsInGroup.map((permission) => {
				return permission.toObject();
			}),
		};
	}

	public async findAllUserGroups(
		userId: number,
	): Promise<AllGroupsResponseDto> {
		void (await this.userService.findById(userId));
		const userGroups = await this.groupRepository.findAllUserGroups(userId);

		return {
			items: userGroups.map((group) => {
				return group.toObject();
			}),
		};
	}

	public async findByKey(key: string): Promise<GroupResponseDto> {
		const groupByKey = await this.groupRepository.findByKey(key);

		if (!groupByKey) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return groupByKey.toObject();
	}

	public async update(
		id: number,
		group: GroupRequestDto,
	): Promise<GroupResponseDto> {
		const groupById = await this.groupRepository.find(id);

		if (!groupById) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { key, name } = group;

		const groupByKey = await this.groupRepository.findByKey(key);
		const groupByName = await this.groupRepository.findByName(name);
		const groupByKeyId = groupByKey?.toObject().id;
		const groupByNameId = groupByName?.toObject().id;

		if (
			(groupByKey && groupByKeyId !== Number(id)) ||
			(groupByName && groupByNameId !== Number(id))
		) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_ALREADY_EXISTS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const updatedGroup = await this.groupRepository.update(
			id,
			GroupEntity.initializeNew({ key, name }),
		);

		return updatedGroup.toObject();
	}

	public async updateGroupPermissions(
		groupId: number,
		permissionId: number,
	): Promise<AllPermissionsResponseDto> {
		void (await this.permissionService.find(permissionId));
		const groupById = await this.groupRepository.find(groupId);

		if (!groupById) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const hasPermission = await this.groupRepository.findPermissionInGroup(
			groupId,
			permissionId,
		);

		const permissionsInGroup = hasPermission
			? await this.groupRepository.removePermissionFromGroup(
					groupId,
					permissionId,
				)
			: await this.groupRepository.addPermissionToGroup(groupId, permissionId);

		return {
			items: permissionsInGroup.map((permission) => {
				return permission.toObject();
			}),
		};
	}

	public async updateUserGroups(
		groupId: number,
		userId: number,
	): Promise<AllGroupsResponseDto> {
		void (await this.userService.findById(userId));
		const groupById = await this.groupRepository.find(groupId);

		if (!groupById) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const hasGroup = await this.groupRepository.findUserInGroup(
			groupId,
			userId,
		);

		const userGroups = hasGroup
			? await this.groupRepository.removeUserFromGroup(groupId, userId)
			: await this.groupRepository.addUserToGroup(groupId, userId);

		return {
			items: userGroups.map((group) => {
				return group.toObject();
			}),
		};
	}
}

export { GroupService };
