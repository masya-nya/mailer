import React from 'react';
import cl from './DeleteAction.module.scss';
import { useSWRConfig } from 'swr';
import { BASE_MAIL_TYPES } from '../../../entities/mail-boxes/lib/consts';
import { mailsService, SelectedMailT } from '../../../entities/mails-list';
import { COLORS } from '../../../shared/lib';
import { DeleteSvg } from '../../../shared/svg';
import { appShadowLoaderStore } from '../../general';

type DeleteActionProps = {
	selectedMails: SelectedMailT[]
}

export const DeleteAction = ({ selectedMails }:DeleteActionProps):React.JSX.Element => {
	const { mutate } = useSWRConfig();
	const moveMsgToDelete = async ():Promise<void> => {
		appShadowLoaderStore.isLoading = true;
		const status = await mailsService.moveMsg(BASE_MAIL_TYPES.deleted.value, selectedMails);
		if (status) {
			await mutate('getMails');
			await mutate('getBaseMailBoxesCount');
		}
		appShadowLoaderStore.isLoading = false;
	};

	return (
		<div onClick={moveMsgToDelete} className={cl['delete-action']}>
			<DeleteSvg width='20' height='20' color={COLORS.red_color} />
			<div className={cl['delete-action__text']}>
				Удалить
			</div>
		</div>
	);
};