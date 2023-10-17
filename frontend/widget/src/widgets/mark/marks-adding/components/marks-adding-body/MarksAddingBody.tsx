import React, { useState } from 'react';
import cl from './MarksAddingBody.module.scss';
import { SelectedMailT } from '../../../../../entities/mails-list';
import { useMarks } from '../../../../../entities/mark';
import { Input } from '../../../../../shared/UI';
import MarksListColumn from '../marks-list-column/MarksListColumn';
import MarksAddButton from '../mark-add-button/MarksAddButton';

type MarksAddingBodyProps = {
	setIsDroppedWindowOpen: React.Dispatch<boolean>
	selectedMails: SelectedMailT[]
	marksOfSelectedMails: string[]
    mutateMarks: (option: string, isRemove: boolean) => void
}

const MarksAddingBody = ({ setIsDroppedWindowOpen, selectedMails, marksOfSelectedMails, mutateMarks }:MarksAddingBodyProps):React.JSX.Element => {
	const [searchValue, setSearchValue] = useState<string>('');
	const { data: marks } = useMarks();

	const filteredMarks = (marks || []).filter(mark => mark.name.toLowerCase().includes(searchValue.toLowerCase()));

	const setSearchMarkHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
		setSearchValue(event.target.value);
	};
	return (
		<div className={cl['marks-adding-body']}>
			<div className={cl['marks-adding-body__search']}>
				<Input type='text' defaultValue={searchValue} onChangeHandler={setSearchMarkHandler} placeholder='Поиск метки' style={{ width: '100%', fontSize: '14px' }} />
			</div>
			<MarksListColumn marks={filteredMarks || []} selectedMails={selectedMails} marksOfSelectedMails={marksOfSelectedMails} setIsDroppedWindowOpen={setIsDroppedWindowOpen} mutateMarks={mutateMarks} />
			<MarksAddButton setIsDroppedWindowOpen={setIsDroppedWindowOpen} />
		</div>
	);
};

export default MarksAddingBody;