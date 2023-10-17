import React from 'react';
import cl from './MailBox.module.scss';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useSWRConfig } from 'swr';
import { baseMailBoxesTitle, baseMailBoxesValue } from '../../../../../entities/mail-boxes';
import { mailStore } from '../../../../../modules/mail-module';
import { Amount } from '../../../../../shared/UI';
import { ConfItemT } from '../../../../../shared/lib';

type MailBoxProps = {
	mailbox: ConfItemT<baseMailBoxesValue, baseMailBoxesTitle>
	amount: number
}

const MailBox = observer(({ mailbox, amount }: MailBoxProps): React.JSX.Element => {
	const { mutate, cache } = useSWRConfig();
	const changePathHandler = () => {
		if (mailStore.mailsFilterPathValue !== mailbox.value) {
			mailStore.changeMailsFolder({ path: mailbox.value, pathName: mailbox.title });
		} else {
			mailStore.resetSemiMailsFilter();
			cache.delete('getMails');
			mutate('getMails');
		}
	};

	return (
		<div
			onClick={changePathHandler}
			className={
				cn(
					cl['mail-type'],
					{
						[cl['mail-type--active']]: mailbox.value === mailStore.mailsFilterPathValue
					}
				)
			}
		>
			<div className={cl['mail-type__left']}>
				<div className={cl['mail-type__svg']}>
					{mailbox.icon}
				</div>
				<div className={cl['mail-type__text']}>
					{mailbox.title}
				</div>
			</div>
			<div className={cl['mail-type__count']}>
				<Amount value={amount} />
			</div>
		</div>
	);
});

export default MailBox;
