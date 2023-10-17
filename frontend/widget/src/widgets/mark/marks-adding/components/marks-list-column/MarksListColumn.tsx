import React from 'react';
import cl from './MarksListColumn.module.scss';
import MarksListGroup from '../marks-list-group/MarksListGroup';
import { SelectedMailT } from '../../../../../entities/mails-list';
import { MarkType } from '../../../../../entities/mark';

type MarksListProps = {
	marks: MarkType[]
	selectedMails: SelectedMailT[]
	marksOfSelectedMails: string[]
	setIsDroppedWindowOpen: React.Dispatch<boolean>
    mutateMarks: (option: string, isRemove: boolean) => void
}

const MarksList = ({ marks, selectedMails, setIsDroppedWindowOpen, marksOfSelectedMails, mutateMarks }: MarksListProps): React.JSX.Element => {
	const marksForRemoving = marks.filter(mark => marksOfSelectedMails.includes(mark._id));

	return (
		<div className={cl['marks-list-column']}>
			{
				Boolean(marks.length)
					? <>
						<MarksListGroup marks={marks} title='Добавить метку:' setIsDroppedWindowOpen={setIsDroppedWindowOpen} selectedMails={selectedMails} mutateMarks={mutateMarks}/>
						{
							Boolean(marksForRemoving.length) &&
							<>
								<div className={cl['marks-list-column__line']}></div>
								<MarksListGroup marks={marksForRemoving} title='Снять метку:' setIsDroppedWindowOpen={setIsDroppedWindowOpen} selectedMails={selectedMails} mutateMarks={mutateMarks} forRemove />
							</>
						}
					</>
					: <div className={cl['marks-list-column__empty']}>Меток нет</div>
			}
		</div>
	);
};

export default MarksList;