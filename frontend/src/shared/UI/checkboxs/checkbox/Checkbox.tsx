import React, { forwardRef, useEffect, useState } from 'react';
import cl from './Checkbox.module.scss';
import cn from 'classnames';
import { CheckMarkSvg, CrossSvg } from '../../../svg';
import { SWGColors } from 'src/shared/lib';

type CheckboxProps = {
	checked: boolean;
	checkedHandler: (event: React.SyntheticEvent, value: boolean) => void;
	type?: 'cross' | 'check';
};

export const Checkbox = forwardRef(
	(
		{ checked, checkedHandler, type = 'check' }: CheckboxProps,
		ref: React.Ref<HTMLInputElement>
	): React.JSX.Element => {
		const [isChecked, setIsChecked] = useState<boolean>(checked);
		useEffect(() => {
			setIsChecked(checked);
		}, [checked]);
		return (
			<label
				onClick={event => event.stopPropagation()}
				className={cl['checkbox']}
			>
				<input
					ref={ref}
					type="checkbox"
					className={cl['checkbox__input']}
					onChange={(event: React.SyntheticEvent) => {
						setIsChecked(prev => !prev);
						checkedHandler(event, !isChecked);
					}}
				/>
				<span
					className={cn(cl['checkbox__target'], {
						[cl['checkbox__target--active']]: isChecked,
					})}
					aria-hidden="true"
				/>
				{type === 'check' ? (
					<CheckMarkSvg
						style={{
							position: 'absolute',
							top: '3px',
							left: '3px',
						}}
						width="14px"
						height="14px"
						color={
							isChecked ? SWGColors.grey : 'transparent'
						}
					/>
				) : (
					<CrossSvg
						style={{ position: 'absolute' }}
						width="20px"
						height="20px"
						color={
							isChecked ? SWGColors.grey : 'transparent'
						}
					/>
				)}
			</label>
		);
	}
);
