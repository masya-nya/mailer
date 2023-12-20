import useSWRImmutable from 'swr/immutable';
import { accountUserStore } from '../..';
import { AccountUserI } from '../schemas/account-user.schema';
import { useSWRReturnType } from 'src/shared/lib';

export const useAccountUser = (
	email: string,
	accountId: string
): useSWRReturnType<AccountUserI> => {
	const { data, error, isLoading, isValidating, mutate } = useSWRImmutable<AccountUserI>(
		'account-user',
		() => accountUserStore.getAccountUser(email, accountId)
	);
	return {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
	};
};
