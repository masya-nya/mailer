import React from 'react';
import cl from './MarksList.module.scss';
import { useSWRConfig } from 'swr';
import { marksStore, MarkType } from '../../../../../entities/mark';
import { MarkWithContext } from '../../../../../features/mark';
import { mailStore } from '../../../../../modules/mail-module';
import { Plus } from '../../../../../shared/UI';

type MarksListProps = {
	marks: MarkType[]
}

const MarksList = ({ marks }:MarksListProps): React.JSX.Element => {
	const { mutate, cache } = useSWRConfig();
	const filteredByMarkHandler = (markId:string):void => {
		mailStore.mailsFilter = { markId };
		cache.delete('getMails');
		mutate('getMails');
	};

	return (
		<div className={cl['marks-module__body']}>
			{
				marks.map(mark => <MarkWithContext onClickHandler={() => filteredByMarkHandler(mark._id)} mark={mark} key={mark._id} />)
			}
			<Plus onClickHandler={() => marksStore.isCreateModalShowHandler()}/>
		</div>
	);
};

export default MarksList;
