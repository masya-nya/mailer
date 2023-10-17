import React from 'react';
import cl from './MarksListGroup.module.scss';
import MarksListColumnItem from '../marks-list-column-item/MarksListColumnItem';
import { SelectedMailT } from '../../../../../entities/mails-list';
import { MarkType } from '../../../../../entities/mark';

type MarksListGroupProps = {
	title: string
	marks: MarkType[]
	selectedMails: SelectedMailT[]
	setIsDroppedWindowOpen: React.Dispatch<boolean>
	forRemove?: boolean
    mutateMarks: (option: string, isRemove: boolean) => void
}

const MarksListGroup = ({ title, marks, selectedMails, setIsDroppedWindowOpen, forRemove = false, mutateMarks }:MarksListGroupProps):React.JSX.Element => {
	return (
		<div className={cl['marks-list-group']}>
			<div className={cl['marks-list-group__title']}>
				{ title }
			</div>
			<div className={cl['marks-list-group__list']}>
				{
					marks.map(mark => <MarksListColumnItem setIsDroppedWindowOpen={setIsDroppedWindowOpen} forRemove={forRemove} selectedMails={selectedMails} mark={mark} mutateMarks={mutateMarks} key={mark._id} />)
				}
			</div>
		</div>
	);
};

export default MarksListGroup;