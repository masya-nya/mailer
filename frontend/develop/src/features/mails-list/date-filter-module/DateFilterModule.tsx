import React, { useState } from 'react';
import cl from './DateFilterModule.module.scss';
import { MailsDateFilterKeysT } from '../../../modules/mail-module';
import { DatePicker, Button } from '../../../shared/UI';
import { MailDateFilterKeys } from './lib/consts';

type DateFilterModuleProps = {
	fromDefault?: string
	toDefault?: string
	isMailDateFiltersClear: boolean
	changeDateFilter: (dateFilter:MailsDateFilterKeysT, value:string) => void
	applyDateFilter: () => void
}

export const DateFilterModule = ({ fromDefault = '', toDefault = '', changeDateFilter, applyDateFilter, isMailDateFiltersClear }:DateFilterModuleProps):React.JSX.Element => {
	const [isOpened, setIsOpened] = useState(false);

	const setDateHandler = (event: React.ChangeEvent<HTMLInputElement>, dateType: MailsDateFilterKeysT):void => {
		changeDateFilter(dateType, event.target.value);
	};

	const clearDateFilters = ():void => {
		changeDateFilter(MailDateFilterKeys.from, '');
		changeDateFilter(MailDateFilterKeys.to, '');
		applyDateFilter();
	};

	return (
		<div className={cl['date-filter-module']}>
			{
				!isOpened && isMailDateFiltersClear &&
				<div onClick={clearDateFilters} className={cl['date-filter-module__clear']}>
					Очистить
				</div>
			}
			{
				!isOpened && isMailDateFiltersClear && '|'
			}
			{
				isOpened &&
				<div className={cl['date-filter-module__body']}>
					<div className={cl['date-filter-module__from-to']}>
						<DatePicker defaultValue={fromDefault} onChangeHandler={(event) => setDateHandler(event, MailDateFilterKeys.from)} />
						-
						<DatePicker defaultValue={toDefault} onChangeHandler={(event) => setDateHandler(event, MailDateFilterKeys.to)} />
					</div>
					<div className={cl['date-filter-module__btn']}>
						<Button type='accent' clickHandler={applyDateFilter}>Применить</Button>
					</div>
				</div>
			}
			<div onClick={() => setIsOpened(prev => !prev)} className={cl['date-filter-module__toggle']}>
				{ isOpened ? 'Отмена' : ' Фильтровать по дате' }
			</div>
		</div>
	);
};
