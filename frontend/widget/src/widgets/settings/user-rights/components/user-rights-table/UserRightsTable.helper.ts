import { ManagerWithGroupNameT, MANAGERS, GROUPS } from '../../../../../shared/lib';

export const mergeManagersAndGroups = ():ManagerWithGroupNameT[] => {
	return Object.values(MANAGERS).map(manager => {
		return {
			...manager,
			group_name: GROUPS[manager.group]
		};
	});
};