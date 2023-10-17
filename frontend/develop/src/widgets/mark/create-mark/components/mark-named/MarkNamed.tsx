import React from 'react';
import cl from './MarkNamed.module.scss';
import { HEX } from '../../../../../shared/lib';
import { Mark } from '../../../../../shared/UI';

type MarkNamedProps = {
	titleMark: string,
	selectedColor: HEX
}

const MarkNamed = ({ titleMark, selectedColor }:MarkNamedProps):React.JSX.Element => {
	return (
		<div className={cl['create-mark__named']}>
			<span className={cl['create-mark__inner']}>
				Создаем метку:
			</span>
			<Mark title={titleMark} color={selectedColor} />
		</div>
	);
};

export default MarkNamed;
