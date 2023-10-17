import useSWR from 'swr';
import { foldersService } from '../../api/folder.service';
import { FolderType } from '../../lib/types';
import { useSWRReturnType } from '../../../../shared/lib/types';

export const useFolders = ():useSWRReturnType<FolderType[]> => {
	const { data, isLoading, error, mutate } = useSWR<FolderType[]>('getFolders', foldersService.getFolders, {
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