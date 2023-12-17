import useSWRImmutable from 'swr/immutable';
import { accountUserStore } from '../..';
import { AccountUserI } from '../schemas/account-user.schema';
import { useSWRReturnType } from 'src/shared/lib';

// const fetcher = async ():Promise<void> => {
// 	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
// 	return await response.json();
// };

export const useAccountUser = (
	email: string,
	accountId: string
): useSWRReturnType<AccountUserI> => {
	const { data, error, isLoading, isValidating, mutate } = useSWRImmutable<AccountUserI>(
		'account-user',
		// () => fetcher()
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
