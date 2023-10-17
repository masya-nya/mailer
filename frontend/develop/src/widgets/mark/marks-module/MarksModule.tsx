import React from 'react';
import cl from './MarksModule.module.scss';
import { useMarks } from '../../../entities/mark';
import { Loader, ErrorText } from '../../../shared/UI';
import { CreateAndEditMarkModal } from './components/create-and-edit-mark-modal/CreateAndEditMarkModal';
import MarksWrapper from './components/marks-wrapper/MarksWrapper';

export const MarksModule = (): React.JSX.Element => {
	const { data: marks, isLoading: marksIsLoading, error: marksIsError } = useMarks();

	const MarksContent = ():React.JSX.Element => {
		if (marksIsLoading) {
			return <Loader />;
		}
		if (marksIsError) {
			return <ErrorText title='Метки: Ошибка запроса' style={{ textAlign: 'center' }} />;
		}
		return <MarksWrapper marks={marks || []} />;
	};

	return (
		<div className={cl['marks-module']}>
			<MarksContent />
			<CreateAndEditMarkModal />
		</div>
	);
};