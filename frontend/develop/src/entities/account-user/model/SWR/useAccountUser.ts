import useSWRImmutable from 'swr/immutable';
import { accountUserStore } from '../..';
import { AccountUserI } from '../schemas/account-user.schema';
import { SWRKeys, useSWRReturnType } from 'src/shared/lib';

export const useAccountUser = (
	userId: string,
	accountId: string
): useSWRReturnType<AccountUserI> => {
	const { data, error, isLoading, isValidating, mutate } =
		useSWRImmutable(
			[SWRKeys.account_user, userId, accountId],
			([_, userId, accountId]) => {
				return accountUserStore.getAccountUser(userId, accountId);
			}
		);
	return {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
	};
};
