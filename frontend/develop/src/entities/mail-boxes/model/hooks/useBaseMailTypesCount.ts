import useSWR from 'swr/immutable';
import { baseMailBoxesService } from '../../api/mail-boxes.service';
import { useSWRReturnType } from '../../../../shared/lib/types';
import { baseMailBoxesValue } from '../../lib/types';

export const useBaseMailBoxesCount = ():useSWRReturnType<Record<baseMailBoxesValue, number>> => {
	const { data, mutate, error, isLoading } = useSWR<Record<baseMailBoxesValue, number>>('getBaseMailBoxesCount', baseMailBoxesService.getBaseMailBoxesCount);

	return {
		data,
		mutate,
		error,
		isLoading
	};
};