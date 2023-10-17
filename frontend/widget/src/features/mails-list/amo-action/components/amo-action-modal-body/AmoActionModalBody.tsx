import React, { useState } from 'react';
import cl from './AmoActionModalBody.module.scss';
import Select from 'react-select';
import { useSelect } from '../../../../../shared/lib/hooks';
import { ServerMailT } from '../../../../../entities/mails-list/lib/types';
import { MANAGERS } from '../../../../../shared/lib/mock';
import { Button, CheckboxLabel } from '../../../../../shared/UI';
import { AmoActionsConf } from '../../../../../entities/amo/lib/config';
import { AmoActionTypesT } from '../../../../../entities/amo/lib/types';
import { DatePicker } from './../../../../../shared/UI/other/date-picker/DatePicker';

type AmoActionModalBodyProps = {
	selectedMailsWithInfo: (ServerMailT | null)[]
	modalHandler: React.Dispatch<boolean>
	actionType: AmoActionTypesT | undefined
}

const AmoActionModalBody = ({ selectedMailsWithInfo, modalHandler, actionType }:AmoActionModalBodyProps):React.JSX.Element => {
	const [responsibleUser, setResponsibleUser] = useSelect(null);
	const [isTriggerNote, setIsTriggerNote] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [nextDate, setNextDate] = useState(new Date().toISOString().slice(0, 10));

	const managersAsOptions = Object.values(MANAGERS).map((manager) => {
		return {
			value: manager.id,
			label: manager.title
		};
	});

	const setNextDateHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
		setNextDate(event.target.value);
	};

	const isTriggerNoteHandler = (event: React.SyntheticEvent, value: boolean):void => {
		event.stopPropagation();
		setIsTriggerNote(value);
	};

	const createEntityHandler = async ():Promise<void> => {
		console.log(selectedMailsWithInfo, responsibleUser, isTriggerNote, actionType);
		if (actionType && responsibleUser) {
			setIsLoading(true);
			const dateToUnix = new Date(nextDate).getTime() / 1000;
			const status = await AmoActionsConf[actionType].action(selectedMailsWithInfo, Number(responsibleUser.value), dateToUnix, isTriggerNote);
			status && modalHandler(false);
			setIsLoading(false);
		}
	};

	const styles = {
		container: (base: object) => ({
			...base,
			width: '100%',
			fontSize: '15px'
		})
	};

	const sendButtonValidation = () => {
		return (!Boolean(responsibleUser) || isLoading);
	};

	return (
		<div className={cl['amo-action-modal-body']}>
			<Select
				isClearable={true}
				defaultValue={null}
				onChange={setResponsibleUser}
				isSearchable={true}
				options={managersAsOptions}
				styles={styles}
				placeholder='Выберите ответственного'
			/>
			{
				actionType === 'customer' &&
				<div className={cl['amo-action-modal-body__date']}>
					Следующая покупка
					<DatePicker defaultValue={nextDate} onChangeHandler={setNextDateHandler} />
				</div>
			}
			<div className={cl['amo-action-modal-body__advanced']}>
				<CheckboxLabel checked={isTriggerNote} checkedHandler={isTriggerNoteHandler}>
					Сработают ли триггеры <span title='Digital Pipeline' >DP</span> во время создания примечания
				</CheckboxLabel>
			</div>
			<div className={cl['amo-action-modal-body__btns']}>
				<Button type="accent" disabled={sendButtonValidation()} clickHandler={createEntityHandler}>Создать</Button>
				<Button type="primary" clickHandler={() => modalHandler(false)}>Отмена</Button>
			</div>
		</div>
	);
};

export default AmoActionModalBody;
