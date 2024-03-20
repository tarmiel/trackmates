import { type Column } from "react-table";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type ActionCellProperties } from "~/pages/management/libs/components/action-cell/libs/types/types.js";
import {
	ActionCell,
	Chips,
} from "~/pages/management/libs/components/components.js";

import { GroupsTableAccessor, GroupsTableHeader } from "../../enums/enums.js";
import { type GroupsTableRow } from "../../types/types.js";

const getGroupColumns = ({
	checkIfCurrentUserHasGroup,
	groupToDataStatus,
	onDelete,
	onEdit,
}: {
	checkIfCurrentUserHasGroup: (groupId: number) => boolean;
	groupToDataStatus: Record<number, ValueOf<typeof DataStatus>>;
	onDelete: (groupId: number) => void;
	onEdit: (groupId: number) => void;
}): Column<GroupsTableRow>[] => {
	return [
		{
			Header: GroupsTableHeader.ID,
			accessor: GroupsTableAccessor.ID,
			width: 50,
		},
		{
			Header: GroupsTableHeader.NAME,
			accessor: GroupsTableAccessor.NAME,
			width: 185,
		},
		{
			Cell: Chips,
			Header: GroupsTableHeader.PERMISSIONS,
			accessor: GroupsTableAccessor.PERMISSIONS,
			width: 165,
		},
		{
			Cell: ActionCell,
			Header: GroupsTableHeader.ACTIONS,
			accessor: ({ id }): ActionCellProperties => {
				return {
					isDisabled: checkIfCurrentUserHasGroup(id),
					isLoading: groupToDataStatus[id] === DataStatus.PENDING,
					onDelete: (): void => {
						onDelete(id);
					},
					onEdit: (): void => {
						onEdit(id);
					},
				};
			},
			width: 100,
		},
	];
};

export { getGroupColumns };
