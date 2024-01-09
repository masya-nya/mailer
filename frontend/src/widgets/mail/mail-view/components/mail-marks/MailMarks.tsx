import React from 'react';
import cl from './MailMarks.module.scss';
import { Mark } from '../../../../../shared/UI';
import { MarkType } from '../../../../../entities/mark';

type MailMarksProps = {
	mailMarks: MarkType[]
}

const MailMarks = ({ mailMarks }: MailMarksProps): React.JSX.Element => {
	return (
		<div className={cl['marks-list']}>
			{
				mailMarks.map(mark => <Mark title={mark.name} color={mark.color} key={mark._id}/>)
			}
		</div>
	);
};

export default MailMarks;