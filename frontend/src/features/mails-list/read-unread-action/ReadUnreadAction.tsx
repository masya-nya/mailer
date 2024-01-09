import React, { useContext, useState } from 'react';
import cl from './ReadUnreadAction.module.scss';
import { mailsService, FLAGS, SelectedMailT } from 'src/entities/mails-list';
import { ContextSelectWrapper, ContextMenuItem, GlobalShadowLoaderContext } from 'src/shared/UI';
import { SWGColors } from 'src/shared/lib';
import { ReadUnreadSvg, CircleSvg } from '../../../shared/svg';

type ReadUnreadActionProps = {
	selectedMails: SelectedMailT[]
    mutateSeen: (isUnread: boolean) => void
}

export const ReadUnreadAction = ({ selectedMails, mutateSeen }:ReadUnreadActionProps):React.JSX.Element => {
	const { store: globalLoaderStore } = useContext(GlobalShadowLoaderContext);
	const [isSelectOpen, setIsSelectOpen] = useState(false);

	const addSeenFlag = async ():Promise<void> => {
		globalLoaderStore.isLoad = true;
		const status = await mailsService.addMsgFlag(FLAGS.seen, selectedMails);
		status && await mutateSeen(true);
		globalLoaderStore.isLoad = false;
	};

	const removeSeenFlag = async ():Promise<void> => {
		globalLoaderStore.isLoad = true;
		const status = await mailsService.removeMsgFlag(FLAGS.seen, selectedMails);
		status && await mutateSeen(false);
		globalLoaderStore.isLoad = false;
	};

	return (
		<div
			onMouseEnter={() => setIsSelectOpen(true)}
			onMouseLeave={() => setIsSelectOpen(false)}
			className={cl['read-unread-action']}>
			<ReadUnreadSvg width='20px' height='20px' color={SWGColors.grey} />
			<div className={cl['read-unread-action__text']}>
				(Не) прочитано
			</div>
			{
				isSelectOpen &&
				<ContextSelectWrapper top='30px' >
					<ContextMenuItem title='Прочитано' onClickHandler={addSeenFlag} >
						<CircleSvg width='10px' height='10px' color={SWGColors.grey} />
					</ContextMenuItem>
					<ContextMenuItem title='Не прочитано' onClickHandler={removeSeenFlag}>
						<CircleSvg width='10px' height='10px' color={SWGColors.grey} bgColor={SWGColors.grey} />
					</ContextMenuItem>
				</ContextSelectWrapper>
			}
		</div>
	);
};