import React, { useState } from 'react';
import cl from './CreateAndEditMark.module.scss';
import { observer } from 'mobx-react-lite';
import { Input, Button } from '../../../shared/UI';
import { HEX } from '../../../shared/lib/types';
import { marksStore, marksService, useMarks, MAX_MARK_LENGTH } from '../../../entities/mark';
import { ColorsPicker } from '../../../features/mark';
import MarkNamed from './components/mark-named/MarkNamed';

export const CreateAndEditMark = observer(():React.JSX.Element => {
	const [selectedColor, setSelectedColor] = useState<HEX>(marksStore.focusedMark.color);
	const [titleMark, setTitleMark] = useState<string>(marksStore.focusedMark.name);
	const { mutate: marksMutate } = useMarks();

	const titleMarkHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
		setTitleMark(event.target.value);
	};

	const emptyValidation = ():boolean => {
		return (titleMark.trim() === '');
	};

	const createMark = async ():Promise<void> => {
		const status = await marksService.createMark(titleMark, selectedColor);
		if (status) {
			marksStore.isCreateModalShowHandler();
			marksMutate();
		}
	};

	const updateMark = async ():Promise<void> => {
		const status = await marksService.updateMark(marksStore.focusedMark._id, titleMark, selectedColor);
		if (status) {
			marksStore.isCreateModalShowHandler();
			marksMutate();
		}
	};

	return (
		<div className={cl['create-mark']}>
			<MarkNamed titleMark={titleMark} selectedColor={selectedColor} />
			<Input type='text' defaultValue={titleMark} warning={emptyValidation()} maxLength={MAX_MARK_LENGTH} onChangeHandler={titleMarkHandler} />
			<ColorsPicker selectedColorHandler={setSelectedColor}/>
			<div className={cl['create-mark__btns']}>
				<Button disabled={emptyValidation()} type='accent' clickHandler={marksStore.focusedMark._id ? updateMark : createMark}>{!!marksStore.focusedMark._id ? 'Сохранить' : 'Создать'}</Button>
				<Button type='primary' clickHandler={() => marksStore.isCreateModalShowHandler()}>Отменить</Button>
			</div>
		</div>
	);
});
