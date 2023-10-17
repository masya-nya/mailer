import React from 'react';
import cl from './MarkWithContext.module.scss';
import { marksService, marksStore, useMarks, MarkType } from '../../../entities/mark';
import { Mark, ContextMenuWrapper, ContextMenu } from '../../../shared/UI';
import { useContextMenu } from '../../../shared/lib/hooks';
import { createPortal } from 'react-dom';

type MarkWithContextProps = {
	mark: MarkType
	onClickHandler: () => void
}

export const MarkWithContext = ({ mark, onClickHandler }: MarkWithContextProps): React.JSX.Element => {
	const { mutate: marksMutate } = useMarks();
	const [isContextMenuOpen, setIsContextMenuOpen, points, contextMenuHandler] = useContextMenu();

	const deleteMark = async (): Promise<void> => {
		setIsContextMenuOpen(false);
		await marksService.deleteMark(mark._id);
		marksMutate();
	};

	const editMarkHandler = (): void => {
		marksStore.focusedMark = mark;
		marksStore.isCreateModalShowHandler();
		setIsContextMenuOpen(false);
	};

	return (
		<>
			<div onContextMenu={contextMenuHandler} onClick={onClickHandler} className={cl['mark-context']}>
				<Mark title={mark.name} color={mark.color} />
			</div>
			{
				isContextMenuOpen &&
				createPortal(
					<ContextMenuWrapper isMenuOpenHandler={setIsContextMenuOpen} top={points.y} left={points.x}>
						<ContextMenu menuOptions={[
							{
								title: 'Редактировать',
								handler: editMarkHandler
							},
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