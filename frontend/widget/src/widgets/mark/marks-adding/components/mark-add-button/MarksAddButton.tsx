import React from 'react';
import cl from './MarksAddButton.module.scss';
import { marksStore } from '../../../../../entities/mark';

type MarksAddButtonProps = {
	setIsDroppedWindowOpen: React.Dispatch<boolean>
}

const MarksAddButton = ({ setIsDroppedWindowOpen }:MarksAddButtonProps):React.JSX.Element => {
	return (
		<div onClick={() => { marksStore.isCreateModalShowHandler(); setIsDroppedWindowOpen(false); }} className={cl['marks-add-button']}>
			<div className={cl['marks-add-button__inner']}>
				Новая метка
			</div>
		</div>
	);
};

export default MarksAddButton;