import React, { useRef } from 'react';
import cl from './MarksAdding.module.scss';
import { SelectedMailT } from '../../../entities/mails-list';
import { DroppedWindowWrapper } from '../../../shared/UI';
import { useDroppedWindow } from '../../../shared/lib';
import MarksAddingBody from './components/marks-adding-body/MarksAddingBody';
import MarksAddingHeader from './components/marks-adding-header/MarksAddingHeader';

type MarksAddingProps = {
	selectedMails: SelectedMailT[]
	marksOfSelectedMails: string[]
    mutateMarks: (option: string, isRemove: boolean) => void
}

export const MarksAdding = ({ selectedMails, marksOfSelectedMails, mutateMarks }:MarksAddingProps):React.JSX.Element => {
	const { current: DROPPED_WINDOW_WRAPPER_WIDTH } = useRef<number>(250);
	const { current: TOP_MARGIN } = useRef<number>(5);
	const { current: classForTargeting } = useRef<string>('marks-adding--target');
	const [isDroppedWindowOpen, setIsDroppedWindowOpen, points, droppedWindowHandler] = useDroppedWindow(classForTargeting);
	const left = points.x - DROPPED_WINDOW_WRAPPER_WIDTH / 2;
	return (
		<div className={cl['marks-adding']}>
			<MarksAddingHeader onClickHandler={droppedWindowHandler} className={classForTargeting} />
			{
				isDroppedWindowOpen &&
				<DroppedWindowWrapper top={points.y + TOP_MARGIN} left={left} width={DROPPED_WINDOW_WRAPPER_WIDTH} isMenuOpenHandler={setIsDroppedWindowOpen}>
					<MarksAddingBody selectedMails={selectedMails} marksOfSelectedMails={marksOfSelectedMails} setIsDroppedWindowOpen={setIsDroppedWindowOpen} mutateMarks={mutateMarks}/>
				</DroppedWindowWrapper>
			}
		</div>
	);
};