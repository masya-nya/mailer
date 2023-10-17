import React from 'react';
import cl from './SpamAction.module.scss';
import { useSWRConfig } from 'swr';
import { BASE_MAIL_TYPES } from '../../../entities/mail-boxes';
import { mailsService, SelectedMailT } from '../../../entities/mails-list';
import { COLORS } from '../../../shared/lib';
import { SpamSvg } from '../../../shared/svg';
import { appShadowLoaderStore } from '../../general';

type SpamActionProps = {
	selectedMails: SelectedMailT[]
}

export const SpamAction = ({ selectedMails }:SpamActionProps):React.JSX.Element => {
	const { mutate } = useSWRConfig();
	const moveMsgToSpam = async ():Promise<void> => {
		appShadowLoaderStore.isLoading = true;
		const status = await mailsService.moveMsg(BASE_MAIL_TYPES.spam.value, selectedMails);
		if (status) {
			await mutate('getMails');
			await mutate('getBaseMailBoxesCount');
		}
		appShadowLoaderStore.isLoading = false;
	};

	return (
		<div onClick={moveMsgToSpam} className={cl['spam-action']}>
			<SpamSvg width='20' height='20' color={COLORS.orange_color} />
			<div className={cl['spam-action__text']}>
				Это спам!
			</div>
		</div>
	);
};