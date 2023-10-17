import React, { useState, useRef, useEffect } from 'react';
import cl from './InputMulti.module.scss';
import cn from 'classnames';
import { COLORS, EmailRegValidation } from '../../../lib/consts';
import { CrossSvg } from '../../../svg';

type InputMultiProps = {
	onChangeHandler: (newValue: string[]) => void,
	transparent?: boolean
	value?: string[]
	defaultValue?: string,
	placeholder?: string,
	autofocus?: boolean,
	name?: string,
	className?: string,
	style?: React.CSSProperties,
	disabled?: boolean,
	warning?: boolean,
	maxLength?: number
}

export const InputMulti = ({ onChangeHandler, className, warning, value = [], transparent = false, placeholder, ...props }: InputMultiProps):React.JSX.Element => {
	const [entered, setEntered] = useState<string[]>(value);
	const input = useRef<HTMLInputElement>(null);

	const addEnteredValue = (event: React.KeyboardEvent<HTMLInputElement> & React.ChangeEvent<HTMLInputElement>):void => {
		const inputValue = event.target.value.trim();
		if (
			event.key === 'Enter' &&
			Boolean(inputValue) &&
			!entered.includes(inputValue) &&
			EmailRegValidation.test(inputValue)
		) {
			setEntered(prev => [...prev, inputValue]);
			event.target.value = '';
		}
	};

	const deleteEnteredValue = (event: React.MouseEvent, recedingValue: string):void => {
		event.stopPropagation();
		setEntered(prev => prev.filter(value => value !== recedingValue));
	};

	const editHandler = (event:React.MouseEvent, value: string):void => {
		event.stopPropagation();
		deleteEnteredValue(event, value);
		if (input) {
			input.current!.value = value;
		}
	};

	const clearInput = ():void => {
		input.current!.value = '';
	};

	useEffect(() => {
		onChangeHandler(entered);
	}, [entered]);

	useEffect(() => {
		setEntered(value);
	}, [value]);

	return (
		<div className={cl['input-multi']} {...props} >
			<div className={cl['input-multi__entered']}>
				{
					entered.map(value =>
						<span onClick={(event) => editHandler(event, value)} className={cl['input-multi__success-value']} key={value}>
							{ value }
							<span onClick={(event) => deleteEnteredValue(event, value)} className={cl['input-multi__success-value-delete']}>
								<CrossSvg width='15' height='15' color={COLORS.font_darker_color} />
							</span>
						</span>
					)
				}
			</div>
			<input
				type='text'
				ref={input}
				onBlur={clearInput}
				className={cn(cl['input-multi__input'], { [cl['input-multi--warning']]: warning }, className)}
				onKeyDown={addEnteredValue}
				placeholder='Введите email и нажмите Enter'
			/>
		</div>
	);
};