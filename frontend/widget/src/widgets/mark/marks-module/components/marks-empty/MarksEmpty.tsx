import React from 'react';
import cl from './MarksEmpty.module.scss';
import { marksStore } from '../../../../../entities/mark';
import { COLORS } from '../../../../../shared/lib';
import { MarkSvg } from '../../../../../shared/svg';
const MarksEmpty = ():React.JSX.Element => {
	return (
		<div className={cl['marks-module__empty']}>
			<MarkSvg width='17' height='17' color={COLORS.font_base_color} />
			<span onClick={() => marksStore.isCreateModalShowHandler()} className={cl['marks-module__empty-add']}>
				Добавить метку
			</span>
		</div>
	);
};

export default MarksEmpty;
