import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import cl from './MailSend.module.scss';
import { Editor } from '@tinymce/tinymce-react';
import { sendMailStore, MailSendService } from 'src/entities/mail-send';
import { LabelInline, InputMulti, InputTransparent } from '../../shared/UI';
import { useSWRConfig } from 'swr';
import { Button } from 'antd';
import { MailContentRoutes } from 'src/entities/email/lib/consts';
import { EmailContext } from 'src/entities/email';

export const MailSend = (): React.JSX.Element => {
	const { store: emailStore } = useContext(EmailContext);
	const { mutate } = useSWRConfig();
	const [emailTo, setEmailTo] = useState<string[]>(sendMailStore.mailTo);
	const [isSendDisabled, setIsSendDisabled] = useState<boolean>(false);
	const subject = useRef<string>('');
	const mailText = useRef<string>('');
	const setMailTextHandler = (value: string): void => {
		mailText.current = value;
	};
	const setSubjectHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const newValue = event.target.value;
		subject.current = newValue;
	};
	const setEmailToHandler = (newValue: string[]): void => {
		setEmailTo(newValue);
	};
	const sendActionHandler = async (): Promise<void> => {
		const referencesIds = sendMailStore.references.map(refer => {
			return { msgId: refer.msgId, msgSeq: refer.msgSeq };
		});
		setIsSendDisabled(true);
		try {
			const status = await MailSendService.sendMail(
				{
					emailTo,
					references: referencesIds,
					subject: subject.current,
					text: mailText.current,
					html: mailText.current
				}
			);
			if (status) {
				emailStore.mailContentRoute = MailContentRoutes.mailsList;
				mutate('getBaseMailBoxesCount');
			}
			setIsSendDisabled(false);
		} catch {
			setIsSendDisabled(false);
		}
	};
	const buttonCheckValidation = useMemo(():boolean => {
		return (!Boolean(emailTo.length) || isSendDisabled);
	}, [emailTo, isSendDisabled]);
	useEffect(() => {
		setEmailTo(sendMailStore.mailTo);
	}, []);
	useEffect(() => {
		return () => {
			sendMailStore.clearPrevOptions();
		};
	}, []);
	return (
		<div className={cl['mail-send']}>
			<div className={cl['mail-send__inputs']}>
				<LabelInline label='Кому' >
					<InputMulti transparent style={{ width: '100%' }} maxTagCount={4} value={emailTo} onChangeHandler={setEmailToHandler} />
				</LabelInline>
				<LabelInline label='Тема' >
					<InputTransparent type='text' style={{ width: '100%' }} onChangeHandler={setSubjectHandler} />
				</LabelInline>
			</div>
			<div className={cl['mail-send__editor']}>
				<Editor
					apiKey={'g9tzrij970h352q9osfaj8pddqo9fjba3n9ivpt1q3572k47'}
					onEditorChange={setMailTextHandler}
					init={{
						placeholder: 'Напишите что-нибудь...',
						skin: 'oxide',
						height: 400,
						menubar: false,
						plugins: 'code',
						toolbar:
							'undo redo |' +
							'blocks fontfamily |' +
							'alignjustify aligncenter alignleft alignright |' +
							'bold italic strikethrough underline |' +
							'forecolor |' +
							'outdent indent |' +
							'subscript superscript |' +
							'removeformat code'
					}}
				/>
			</div>
			<div className={cl['mail-send__btns']}>
				<Button type='primary' disabled={buttonCheckValidation} onClick={sendActionHandler}>Отправить</Button>
			</div>
		</div>
	);
};
