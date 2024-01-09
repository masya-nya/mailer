import { CSSProperties, FC, useContext } from 'react';
import cl from './MailBox.module.scss';
import { ConfItemT } from 'src/shared/lib';
import {
	baseMailBoxesTitle,
	baseMailBoxesValue,
} from 'src/entities/mail-boxes';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { EmailContext } from 'src/entities/email';
import { useSWRConfig } from 'swr';
import { MailContentRoutes } from 'src/entities/email/lib/consts';

interface MailBoxProps {
	mailbox: ConfItemT<baseMailBoxesValue, baseMailBoxesTitle>;
	className?: string;
	style?: CSSProperties;
}

export const MailBox: FC<MailBoxProps> = observer(({ mailbox }) => {
	const { mutate, cache } = useSWRConfig();
	const { store: emailStore } = useContext(EmailContext);
	const changePathHandler = (): void => {
		emailStore.mailContentRoute = MailContentRoutes.mailsList;
		if (emailStore.mailsFilterPathValue !== mailbox.value) {
			emailStore.changeMailsFolder({ path: mailbox.value, pathName: mailbox.title });
		} else {
			emailStore.resetSemiMailsFilter();
			cache.delete('getMails');
			mutate('getMails');
		}
	};

	return (
		<div
			onClick={changePathHandler}
			className={
				cn(
					cl['mail-box'],
					{
						[cl['mail-box--active']]: emailStore.path === mailbox.value
					}
				)
			}>
			<div className={cl['mail-box__svg']}>{mailbox.icon}</div>
			<div className={cl['mail-box__text']}>{mailbox.title}</div>
		</div>
	);
});
