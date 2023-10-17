import React from 'react';
import cl from './ArrowToggle.module.scss';
import { COLORS } from '../../../shared/lib';
import { ArrowDownSvg, ArrowRightSvg } from '../../../shared/svg';

type ArrowToggleProps = {
	isChildrenOpen: boolean,
	isChildrenOpenHandler: (event: React.SyntheticEvent) => void
}

export const ArrowToggle = ({ isChildrenOpen, isChildrenOpenHandler }:ArrowToggleProps): React.JSX.Element => {
	return (
		<div className={cl['arrow-toggle']} onClick={(event) => isChildrenOpenHandler(event)}>
			{
				isChildrenOpen
					? <ArrowDownSvg style={{ marginTop: '2px' }} width='15' height='15' color={COLORS.font_base_color} />
					: <ArrowRightSvg width='15' height='15' color={COLORS.font_base_color} />
			}
		</div>
	);
};
