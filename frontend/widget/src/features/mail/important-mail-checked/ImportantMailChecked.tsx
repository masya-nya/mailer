import React, { useState } from 'react';
import cl from './ImportantMailChecked.module.scss';
import cn from 'classnames';
import { SelectedMailT, mailsService, FLAGS } from '../../../entities/mails-list';
import { ImportantSvg } from '../../../shared/svg';

type ImportantMailCheckedProps = {
	checked: boolean
	isHovered?: boolean
	msgId: SelectedMailT
	mutateHandler:() => void
}

export const ImportantMailChecked = ({ checked, isHovered = true, msgId, mutateHandler }:ImportantMailCheckedProps):React.JSX.Element => {
	const [isLoading, setIsLoading] = useState(false);

	const handleChangeStatus = async (event:React.MouseEvent):Promise<void> => {
		event.stopPropagation();
		if (!isLoading) {
			setIsLoading(true);
			const status = checked ? await mailsService.removeMsgFlag(FLAGS.important, [msgId]) : await mailsService.addMsgFlag(FLAGS.important, [msgId]);
			status && await mutateHandler();
			setIsLoading(false);
		}
	};

	return (
		<div className={cl['important-mail-checked']} title={checked ? 'Снять флажок' : 'Пометить флажком'}>
			<ImportantSvg
				width='25'
				height='25'
				clickHandler={handleChangeStatus}
				className={
					cn(
						cl['important-mail-checked__svg'],
						{
							[cl['important-mail-checked__svg--active']]: checked,
							[cl['important-mail-checked__svg--unactive']]: isHovered,
							[cl['important-mail-checked__svg--loading']]: isLoading
						}
					)
				}
			/>
		</div>
	);
};