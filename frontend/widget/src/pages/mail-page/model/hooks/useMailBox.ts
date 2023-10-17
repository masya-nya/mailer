import useSWR from 'swr/immutable';
import { mailPageService } from '../../api/mail-page.service';
import { useSWRReturnType, MailBox } from '../../../../shared/lib';

export const useCorporateMailBoxes = ():useSWRReturnType<MailBox[]> => {
	const { data, isLoading, error, mutate } = useSWR<MailBox[]>('getCorporateMails', mailPageService.getCorporateMails);

	return {
		data,
		isLoading,
		error,
		mutate
	};
};

export const usePersonalMailBoxes = ():useSWRReturnType<MailBox[]> => {
	const { data, isLoading, error, mutate } = useSWR<MailBox[]>('getPersonalMails', mailPageService.getPersonalMails);

	return {
		data,
		isLoading,
		error,
		mutate
	};
};