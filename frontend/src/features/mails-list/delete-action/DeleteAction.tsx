import React, { useContext } from 'react';
import cl from './DeleteAction.module.scss';
import { useSWRConfig } from 'swr';
import { BASE_MAIL_TYPES } from '../../../entities/mail-boxes/lib/consts';
import { mailsService, SelectedMailT } from '../../../entities/mails-list';
import { DeleteSvg } from '../../../shared/svg';
import { SWGColors } from 'src/shared/lib';
import { GlobalShadowLoaderContext } from 'src/shared/UI';

type DeleteActionProps = {
	selectedMails: SelectedMailT[]
}

export const DeleteAction = ({ selectedMails }:DeleteActionProps):React.JSX.Element => {
	const { store: globalLoaderStore } = useContext(GlobalShadowLoaderContext);
	const { mutate } = useSWRConfig();
	const moveMsgToDelete = async ():Promise<void> => {
		globalLoaderStore.isLoad = true;
		const status = await mailsService.moveMsg(BASE_MAIL_TYPES.deleted.value, selectedMails);
		if (status) {
			await mutate('getMails');
			await mutate('getBaseMailBoxesCount');
		}
		globalLoaderStore.isLoad = false;
	};

	return (
		<div onClick={moveMsgToDelete} className={cl['delete-action']}>
			<DeleteSvg width='20px' height='20px' color={SWGColors.grey} />
			<div className={cl['delete-action__text']}>
				Удалить
			</div>
		</div>
	);
};