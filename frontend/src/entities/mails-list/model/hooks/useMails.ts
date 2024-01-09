import useSWR from 'swr/immutable';
import { mailsPageT } from '../../lib/types';
import { mailsService } from '../../api/mails-list.service';
import { useSWRReturnType } from '../../../../shared/lib/types';

export const useMails = ():useSWRReturnType<mailsPageT | null> => {
	const { data, isLoading, isValidating, error, mutate } = useSWR<mailsPageT | null>('getMails', mailsService.getMails);

	return {
		data,
		isLoading,
		error,
		isValidating,
		mutate
	};
};