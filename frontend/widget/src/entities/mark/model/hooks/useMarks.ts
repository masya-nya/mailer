import useSWR from 'swr';
import { marksService } from '../../api/mark.service';
import { MarkType } from '../../lib/types';
import { useSWRReturnType } from '../../../../shared/lib/types';

export const useMarks = ():useSWRReturnType<MarkType[]> => {
	const { data, isLoading, error, mutate } = useSWR<MarkType[]>('getMarks', marksService.getMarks, {
		refreshInterval: 0,
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	});

	return {
		data,
		isLoading,
		error,
		mutate
	};
};