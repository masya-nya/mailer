import React from 'react';
import cl from './ColorsRow.module.scss';
import { ColorPick } from '../../../../../shared/UI';
import { HEX } from '../../../../../shared/lib';

type ColorsRowProps = {
	colors: HEX[],
	colorHandler: React.Dispatch<HEX>
}

const ColorsRow = ({ colors, colorHandler }:ColorsRowProps):React.JSX.Element => {
	return (
		<div className={cl['color-row']}>
			{
				colors.map(color => <ColorPick colorHandler={colorHandler} color={color} key={color}/>)
			}
		</div>
	);
};

export default ColorsRow;
