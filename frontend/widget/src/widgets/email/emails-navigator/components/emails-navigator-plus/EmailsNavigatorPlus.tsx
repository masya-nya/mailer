import React from 'react';
import cl from './EmailsNavigatorPlus.module.scss';
import { COLORS, MailBox } from '../../../../../shared/lib';
import { PlusSvg } from '../../../../../shared/svg';

type EmailsNavigatorPlusProps = {
	onClickHandler: (mail: MailBox | null) => void
}

const EmailsNavigatorPlus = ({ onClickHandler }:EmailsNavigatorPlusProps):React.JSX.Element => {
	return (
		<div onClick={() => onClickHandler(null)} className={cl['emails-navigator-plus']}>
			<PlusSvg width='17' height='17' color={COLORS.font_base_color} />
		</div>
	);
};

export default EmailsNavigatorPlus;
