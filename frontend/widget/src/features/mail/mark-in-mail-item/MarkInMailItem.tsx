import React from 'react';
import cl from './MarkInMailItem.module.scss';
import { useMails, SelectedMailT } from '../../../entities/mails-list';
import { marksService, MarkType } from '../../../entities/mark';
import { Mark, ContextMenuWrapper, ContextMenu } from '../../../shared/UI';
import { useContextMenu } from '../../../shared/lib';
import { createPortal } from 'react-dom';

type MarkInMailItemProps = {
	mark: MarkType
	msgIdentifier: SelectedMailT
}

export const MarkInMailItem = ({ mark, msgIdentifier }: MarkInMailItemProps): React.JSX.Element => {
	const [isContextMenuOpen, setIsContextMenuOpen, points, contextMenuHandler] = useContextMenu();
	const { mutate } = useMails();

	const deleteMark = async (): Promise<void> => {
		setIsContextMenuOpen(false);
		const status = await marksService.removeMark([mark._id], [msgIdentifier]);
		status && mutate();
	};

	return (
		<>
			<div onContextMenu={contextMenuHandler} className={cl['mark-in-mail-item']}>
				<Mark title={mark.name} color={mark.color} />
			</div>
			{
				isContextMenuOpen &&
				createPortal(
					<ContextMenuWrapper isMenuOpenHandler={setIsContextMenuOpen} top={points.y} left={points.x}>
						<ContextMenu menuOptions={[
							{
								title: 'Удалить',
								handler: deleteMark,
								type: 'danger'
							}
						]
						} />
					</ContextMenuWrapper>
					, document.body)
			}
		</>
	);
};
