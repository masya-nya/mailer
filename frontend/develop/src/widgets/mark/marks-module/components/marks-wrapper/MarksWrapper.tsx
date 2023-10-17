import React from 'react';
import cl from './MarksWrapper.module.scss';
import MarksEmpty from '../marks-empty/MarksEmpty';
import MarksList from '../marks-list/MarksList';
import { MarkType } from '../../../../../entities/mark';

type MarksWrapperProps = {
	marks: MarkType[]
}

const MarksWrapper = ({ marks }: MarksWrapperProps): React.JSX.Element => {
	return (
		<div className={cl['marks-wrapper']}>
			{
				marks.length
					? <MarksList marks={marks} />
					: <MarksEmpty/>
			}
		</div>
	);
};

export default MarksWrapper;
