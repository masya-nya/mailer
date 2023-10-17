import React from 'react';
import cl from './WriteButton.module.scss';
import cn from 'classnames';
import { WriteSvg } from '../../../../shared/svg';
import { mailStore } from '../../model/store/mail-module.store';
import { MailContentRoutes } from '../../lib/consts';
import { COLORS } from '../../../../shared/lib';

type WriteButtonProps = {
	className?: string
}

const WriteButton = ({ className }: WriteButtonProps): React.JSX.Element => {
	return (
		<div onClick={() => mailStore.mailContentRoute = MailContentRoutes.mailSending} className={cn(cl['write-button'], className)}>
			<div className={cl['write-button__container']}>
				<WriteSvg width='17' height='17' color={COLORS.black_color} />
				<span className={cl['write-button__text']}>
					Написать
				</span>
			</div>
		</div>
	);
};

export default WriteButton;
