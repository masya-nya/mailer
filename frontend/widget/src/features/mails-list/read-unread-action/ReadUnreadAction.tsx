import React, { useState } from 'react';
import cl from './ReadUnreadAction.module.scss';
import { mailsService, FLAGS, SelectedMailT } from '../../../entities/mails-list';
import { ContextSelectWrapper, ContextMenuItem } from '../../../shared/UI';
import { COLORS } from '../../../shared/lib';
import { ReadUnreadSvg, CircleSvg } from '../../../shared/svg';
import { appShadowLoaderStore } from '../../general';

type ReadUnreadActionProps = {
	selectedMails: SelectedMailT[]
    mutateSeen: (isUnread: boolean) => void
}

export const ReadUnreadAction = ({ selectedMails, mutateSeen }:ReadUnreadActionProps):React.JSX.Element => {
	const [isSelectOpen, setIsSelectOpen] = useState(false);

	const addSeenFlag = async ():Promise<void> => {
		appShadowLoaderStore.isLoading = true;
		const status = await mailsService.addMsgFlag(FLAGS.seen, selectedMails);
		status && await mutateSeen(true);
		appShadowLoaderStore.isLoading = false;
	};

	const removeSeenFlag = async ():Promise<void> => {
		appShadowLoaderStore.isLoading = true;
		const status = await mailsService.removeMsgFlag(FLAGS.seen, selectedMails);
		status && await mutateSeen(false);
		appShadowLoaderStore.isLoading = false;
	};

	return (
		<div
			onMouseEnter={() => setIsSelectOpen(true)}
			onMouseLeave={() => setIsSelectOpen(false)}
			className={cl['read-unread-action']}>
			<ReadUnreadSvg width='20' height='20' color={COLORS.font_base_color} />
			<div className={cl['read-unread-action__text']}>
				(Не) прочитано
			</div>
			{
				isSelectOpen &&
				<ContextSelectWrapper top='30px' >
					<ContextMenuItem title='Прочитано' onClickHandler={addSeenFlag} >
						<CircleSvg width='10' height='10' color={COLORS.font_base_color} />
					</ContextMenuItem>
					<ContextMenuItem title='Не прочитано' onClickHandler={removeSeenFlag}>
						<CircleSvg width='10' height='10' color={COLORS.font_base_color} colorBG={COLORS.font_base_color} />
					</ContextMenuItem>
				</ContextSelectWrapper>
			}
		</div>
	);
};