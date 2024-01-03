import React, {
	useState,
	useRef,
	useEffect,
	useMemo,
	ChangeEvent,
	FC,
} from 'react';
import cl from './InputMulti.module.scss';
import cn from 'classnames';
import { COLORS } from '../../../lib/consts';
import { CrossSvg } from '../../../svg';
import {
	useCloseInputMultiModalWindow,
	useDroppedWindowInpuMulti,
} from './InputMulti.handler';
import { useEntered } from './InputMulti.hooks';

type InputMultiProps = {
	onChangeHandler: (newValue: string[]) => void;
	transparent?: boolean;
	value?: string[];
	defaultValue?: string;
	placeholder?: string;
	autofocus?: boolean;
	name?: string;
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	disabled?: boolean;
	warning?: boolean;
	maxLength?: number;
	maxTagCount?: number;
};

const SuccessValue = ({
	value,
	editHandler,
	deleteEnteredValue,
}: {
	value: string;
	editHandler: (event: React.MouseEvent, value: string) => void;
	deleteEnteredValue: (event: React.MouseEvent, value: string) => void;
}): React.JSX.Element => {
	return (
		<div
			onClick={event => editHandler(event, value)}
			className={cl['input-multi__success-value']}
			key={value}
		>
			<span
				className={cl['input-multi__success-value-inner']}
				title={value}
			>
				{value}
			</span>
			<span
				onClick={event => deleteEnteredValue(event, value)}
				className={cl['input-multi__success-value-delete']}
			>
				<CrossSvg
					width="15px"
					height="15px"
					color={COLORS.font_darker_color}
				/>
			</span>
		</div>
	);
};

const HiddenSuccessValuesModal: FC<{
	children: React.ReactNode;
	top: number;
	left: number;
	setIsDroppedWindowOpen: React.Dispatch<boolean>;
}> = ({ children, top, left, setIsDroppedWindowOpen }) => {
	const modalRef = useRef(null);
	useCloseInputMultiModalWindow(modalRef, setIsDroppedWindowOpen);
	return (
		<div
			ref={modalRef}
			style={{ top: top + 'px', left: left + 'px' }}
			className={cl['input-multi__success-value-tag-modal']}
		>
			{children}
		</div>
	);
};

const HiddenSuccessValues = ({
	unvisibleEntered,
	editHandler,
	deleteEnteredValue,
}: {
	unvisibleEntered: string[];
	editHandler: (event: React.MouseEvent, value: string) => void;
	deleteEnteredValue: (event: React.MouseEvent, value: string) => void;
}): React.JSX.Element => {
	const { current: classForTargeting } = useRef<string>(
		'input-multi--target'
	);
	const { current: DROPPED_WINDOW_WRAPPER_WIDTH } = useRef<number>(450);
	const [
		isDroppedWindowOpen,
		setIsDroppedWindowOpen,
		points,
		droppeWindowHandler,
	] = useDroppedWindowInpuMulti(classForTargeting);
	const left = points.x - DROPPED_WINDOW_WRAPPER_WIDTH / 2;

	return (
		<>
			<span
				onClick={droppeWindowHandler}
				className={cn(
					cl['input-multi__success-value-tag-count'],
					classForTargeting
				)}
			>
				{'+' + unvisibleEntered.length}
			</span>
			{isDroppedWindowOpen && (
				<HiddenSuccessValuesModal
					left={left}
					top={points.y}
					setIsDroppedWindowOpen={setIsDroppedWindowOpen}
				>
					{unvisibleEntered.map(value => (
						<SuccessValue
							value={value}
							deleteEnteredValue={deleteEnteredValue}
							editHandler={editHandler}
							key={value}
						/>
					))}
				</HiddenSuccessValuesModal>
			)}
		</>
	);
};

export const InputMulti = ({
	onChangeHandler,
	className,
	warning,
	value = [],
	transparent,
	placeholder,
	id,
	maxTagCount = 1,
	maxLength,
	...props
}: InputMultiProps): React.JSX.Element => {
	const input = useRef<HTMLInputElement>(null);
	const [isValidate, setIsValidate] = useState<boolean>(true);
	const [
		entered,
		setEntered,
		addEnteredValueHandler,
		deleteEnteredValueHandler,
	] = useEntered(value);
	const [inputV, setInputV] = useState<string>('');

	const [visibleEntered, unvisibleEntered] = useMemo(() => {
		const visible = entered.slice(0, maxTagCount);
		const unvisible = entered.slice(maxTagCount);
		return [visible, unvisible];
	}, [entered, maxTagCount]);

	const clearInput = (): void => {
		input.current!.value = '';
		setIsValidate(true);
	};

	const addEnteredValue = (
		event: React.KeyboardEvent<HTMLInputElement> &
			React.ChangeEvent<HTMLInputElement>
	): void => {
		const inputValue = event.target.value.trim();
		if (event.key === 'Enter') {
			const status = addEnteredValueHandler(inputValue);
			status ? clearInput() : setIsValidate(false);
		}
	};

	const inputVHandler = (event: ChangeEvent<HTMLInputElement>): void => {
		setInputV(event.target.value);
	};

	const deleteEnteredValue = (
		event: React.MouseEvent,
		recedingValue: string
	): void => {
		event.stopPropagation();
		deleteEnteredValueHandler(recedingValue);
	};

	const editHandler = (event: React.MouseEvent, value: string): void => {
		event.stopPropagation();
		deleteEnteredValue(event, value);
		if (input) {
			input.current!.value = value;
		}
	};

	const onBlurHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const inputValue = event.target.value.trim();
		addEnteredValueHandler(inputValue);
		clearInput();
	};

	useEffect(() => {
		if (!isValidate) {
			setIsValidate(true);
		}
	}, [inputV, isValidate]);

	useEffect(() => {
		onChangeHandler(entered);
	}, [entered, onChangeHandler]);

	useEffect(() => {
		setEntered(value);
	}, [value, setEntered]);

	return (
		<div
			className={cn(cl['input-multi'], {
				[cl['input-multi--warning']]: warning || !isValidate,
				[cl['input-multi--transparent']]: transparent,
			}, className)}
			{...props}
		>
			<div className={cl['input-multi__entered']}>
				{visibleEntered.map(value => (
					<SuccessValue
						value={value}
						deleteEnteredValue={deleteEnteredValue}
						editHandler={editHandler}
						key={value}
					/>
				))}
				{Boolean(unvisibleEntered.length) && (
					<HiddenSuccessValues
						unvisibleEntered={unvisibleEntered}
						deleteEnteredValue={deleteEnteredValue}
						editHandler={editHandler}
					/>
				)}
			</div>
			<input
				type="text"
				id={id}
				ref={input}
				defaultValue={inputV}
				className={cl['input-multi__input']}
				placeholder={placeholder}
				maxLength={maxLength}
				onBlur={onBlurHandler}
				onKeyDown={addEnteredValue}
				onChange={inputVHandler}
			/>
		</div>
	);
};
