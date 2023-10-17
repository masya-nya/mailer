import React, { useState, useRef, useEffect } from 'react';
import cl from './InputTransparentMulti.module.scss';
import cn from 'classnames';
import { COLORS, EmailRegValidation } from '../../../lib/consts';
import { CrossSvg } from '../../../svg';

type InputTransparentMultiProps = {
	type: 'text',
	onChangeHandler: (newValue: string[]) => void,
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

export const InputTransparentMulti = ({ onChangeHandler, className, warning, value = [], ...props }: InputTransparentMultiProps):React.JSX.Element => {
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
		<div className={cl['input-transparent-multi']} {...props} >
			<div className={cl['input-transparent-multi__entered']}>
				{
					entered.map(value =>
						<span onClick={(event) => editHandler(event, value)} className={cl['input-transparent-multi__success-value']} key={value}>
							{ value }
							<span onClick={(event) => deleteEnteredValue(event, value)} className={cl['input-transparent-multi__success-value-delete']}>
								<CrossSvg width='15' height='15' color={COLORS.font_darker_color} />
							</span>
						</span>
					)
				}
			</div>
			<input
				ref={input}
				onBlur={clearInput}
				className={cn(cl['input-transparent-multi__input'], { [cl['input-transparent-multi--warning']]: warning }, className)}
				onKeyDown={addEnteredValue}
			/>
		</div>
	);
};