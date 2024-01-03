import useSWRImmutable from 'swr/immutable';
import { SWRKeys, useSWRReturnType } from 'src/shared/lib';
import { accountRolesStore } from '../store/roles.store';
import { RoleI } from '../schemas/role.schema';
import { UserPopulateI } from 'src/entities/user';

export const useAccountRoles = (
	accountId: string
): useSWRReturnType<RoleI<UserPopulateI>[]> => {
	const { data, error, isLoading, isValidating, mutate } =
		useSWRImmutable(
			[SWRKeys.account_roles, accountId],
			([_, accountId]) => accountRolesStore.getAccountRoles(accountId)
		);
	return {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
	};
};
