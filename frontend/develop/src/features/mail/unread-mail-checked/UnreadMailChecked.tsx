import React, { useState } from 'react';
import cl from './UnreadMailChecked.module.scss';
import cn from 'classnames';
import { mailsService, FLAGS, SelectedMailT } from '../../../entities/mails-list';
import { UnreadSvg } from '../../../shared/svg';

type UnreadMailCheckedProps = {
	checked: boolean
	isHovered?: boolean
	msgId: SelectedMailT
    mutateHandler: () => void
}

export const UnreadMailChecked = ({ checked, isHovered = true, msgId, mutateHandler }:UnreadMailCheckedProps):React.JSX.Element => {
	const [isLoading, setIsLoading] = useState(false);
	const handleUnreadStatus = async (event: React.MouseEvent):Promise<void> => {
		event.stopPropagation();
		if (!isLoading) {
			setIsLoading(true);
			const status = checked ? await mailsService.addMsgFlag(FLAGS.seen, [msgId]) : await mailsService.removeMsgFlag(FLAGS.seen, [msgId]);
			status && await mutateHandler();
			setIsLoading(false);
		}
	};

	return (
		<div className={cl['unread-mail-checked']} title={checked ? 'Пометить прочитанным' : 'Пометить непрочитанным'}>
			<UnreadSvg
				width='10'
				height='10'
				clickHandler={handleUnreadStatus}
				className={
					cn(
						cl['unread-mail-checked__svg'],
						{
							[cl['unread-mail-checked__svg--active']]: checked,
							[cl['unread-mail-checked__svg--unactive']]: isHovered,
							[cl['unread-mail-checked__svg--loading']]: isLoading
						}
					)
				}
			/>
		</div>
	);
};
