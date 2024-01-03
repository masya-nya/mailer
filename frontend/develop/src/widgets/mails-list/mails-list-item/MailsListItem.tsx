import React, { useState } from 'react';
import cl from './MailsListItem.module.scss';
import cn from 'classnames';
import {
	MailT,
	SelectedMailT,
	useMails,
	FLAGS,
} from '../../../entities/mails-list';
import { Checkbox, AvatarStub } from 'src/shared/UI';
import { UnreadMailChecked, ImportantMailChecked } from 'src/features/mail';
import { PaperClipSvg } from 'src/shared/svg';
import { SWGColors } from 'src/shared/lib';
import { emailStore } from 'src/entities/email';
import { MailContentRoutes } from 'src/entities/email/lib/consts';

type MailsListItemProps = {
	mail: MailT;
	setMails: React.Dispatch<(prev: MailT[]) => MailT[]>;
	setSelectedMails: React.Dispatch<
		(prev: SelectedMailT[]) => SelectedMailT[]
	>;
	isLastOne: boolean;
};

export const MailsListItem = ({
	mail,
	setSelectedMails,
	setMails,
	isLastOne,
}: MailsListItemProps): React.JSX.Element => {
	const [isHovered, setIsHovered] = useState(false);
	const isUnread = !mail.flags.includes(FLAGS.seen);
	const isImportant = mail.flags.includes(FLAGS.important);
	const name = mail.from.value[0].name;
	const address = mail.from.value[0].address;
	const subject = mail.subject;
	const text = mail.text;
	const attachments = mail.attachments.map(att => {
		return att.fileName;
	});
	const mailIdentifier = { msgId: mail.msgId, msgSeq: mail.msgSeq };

	const setIsMailSelectedHandler = (
		event: React.SyntheticEvent,
		value: boolean
	): void => {
		event.stopPropagation();
		setMails(prev =>
			prev.map(oldMail => {
				if (oldMail.msgSeq === mail.msgSeq) {
					return { ...mail, checked: !mail.checked };
				}
				return oldMail;
			})
		);
		if (value) {
			setSelectedMails(prev => [
				...prev,
				{ msgId: mail.msgId, msgSeq: mail.msgSeq },
			]);
		} else {
			setSelectedMails(prev =>
				prev.filter(identifiers => identifiers.msgSeq !== mail.msgSeq)
			);
		}
	};

	const { mutate } = useMails();

	const handleOpenMailView = (): void => {
		emailStore.mailContentRoute = MailContentRoutes.mailView;
		emailStore.selectedMailIdentifier = { msgSeq: mail.msgSeq, msgId: mail.msgId };
	};

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={handleOpenMailView}
			className={cn(cl['mails-list-item'], {
				[cl['mails-list-item--checked']]: mail.checked,
				[cl['mails-list-item--unread']]: isUnread,
				[cl['mails-list-item--important']]: isImportant,
			})}
		>
			<div
				className={cn(
					cl['mails-list-item__border--top'],
					cl['mails-list-item__border']
				)}
			></div>
			{isLastOne && (
				<div
					className={cn(
						cl['mails-list-item__border--bottom'],
						cl['mails-list-item__border']
					)}
				></div>
			)}
			<div className={cl['mails-list-item__hover']}></div>
			<div className={cl['mails-list-item__important']}></div>
			<div className={cl['mails-list-item__checked']}></div>
			<div className={cl['mails-list-item__wrapper']}>
				<div className={cl['mails-list-item__left']}>
					<UnreadMailChecked
						msgId={mailIdentifier}
						checked={isUnread}
						isHovered={isHovered}
						mutateHandler={mutate}
					/>
					<Checkbox
						checked={mail.checked}
						checkedHandler={setIsMailSelectedHandler}
					/>
					<div className={cl['mails-list-item__from']}>
						<AvatarStub name={name} address={address} />
						<div className={cl['mails-list-item__name']}>
							{name || address}
						</div>
					</div>
				</div>
				<div className={cl['mails-list-item__body']}>
					<ImportantMailChecked
						msgId={mailIdentifier}
						checked={isImportant}
						isHovered={isHovered}
						mutateHandler={mutate}
					/>
					<div className={cl['mails-list-item__textual']}>
						<div className={cl['mails-list-item__subject']}>
							<span
								className={cl['mails-list-item__subject-inner']}
							>
								{subject || '(Без темы)'}
							</span>
						</div>
						<div className={cl['mails-list-item__text']}>
							{text}
						</div>
					</div>
				</div>
				{Boolean(mail.attachments.length) && (
					<div
						className={cl['mails-list-item__attachments']}
						title={attachments.join('\n')}
					>
						<PaperClipSvg
							width="23px"
							height="23px"
							color={SWGColors.grey}
						/>
					</div>
				)}
				<div className={cl['mails-list-item__date']}>
					{new Date(mail.date).toLocaleDateString()}
				</div>
			</div>
		</div>
	);
};
