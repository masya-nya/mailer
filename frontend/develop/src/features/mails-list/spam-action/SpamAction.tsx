import React, { useContext } from 'react';
import cl from './SpamAction.module.scss';
import { useSWRConfig } from 'swr';
import { BASE_MAIL_TYPES } from '../../../entities/mail-boxes';
import { mailsService, SelectedMailT } from '../../../entities/mails-list';
import { SpamSvg } from '../../../shared/svg';
import { GlobalShadowLoaderContext } from 'src/shared/UI';
import { SWGColors } from 'src/shared/lib';

type SpamActionProps = {
	selectedMails: SelectedMailT[]
}

export const SpamAction = ({ selectedMails }:SpamActionProps):React.JSX.Element => {
	const { store: globalLoaderStore } = useContext(GlobalShadowLoaderContext);
	const { mutate } = useSWRConfig();
	const moveMsgToSpam = async ():Promise<void> => {
		globalLoaderStore.isLoad = true;
		const status = await mailsService.moveMsg(BASE_MAIL_TYPES.spam.value, selectedMails);
		if (status) {
			await mutate('getMails');
			await mutate('getBaseMailBoxesCount');
		}
		globalLoaderStore.isLoad = false;
	};

	return (
		<div onClick={moveMsgToSpam} className={cl['spam-action']}>
			<SpamSvg width='20px' height='20px' color={SWGColors.grey} />
			<div className={cl['spam-action__text']}>
				Это спам!
			</div>
		</div>
	);
};