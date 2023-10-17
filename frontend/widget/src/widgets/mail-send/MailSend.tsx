import React, { useEffect, useRef, useState } from 'react';
import cl from './MailSend.module.scss';
import { Editor } from '@tinymce/tinymce-react';
import { observer } from 'mobx-react-lite';
import { sendMailStore, MailSendService, FilesMaxSize } from '../../entities/mail-send';
import { SelectedMailT } from '../../entities/mails-list';
import { MailContentRoutes, mailStore } from '../../modules/mail-module';
import { LabelInline, InputTransparentMulti, InputTransparent, Email, ButtonYandex, InputFile, File } from '../../shared/UI';
import { useSWRConfig } from 'swr';
import { formatSizeUnits } from '../../shared/lib/helpers/formatSizeUnits';
import cn from 'classnames';

export const MailSend = observer((): React.JSX.Element => {
	const { mutate } = useSWRConfig();
	const [emailTo, setEmailTo] = useState<string[]>(sendMailStore.mailTo);
	const [files, setFiles] = useState<File[]>([]);
	const [isSendDisabled, setIsSendDisabled] = useState<boolean>(false);
	const filesSize = useRef<number>(0);
	const subject = useRef<string>('');
	const mailText = useRef<string>('');
	const inputRef = useRef<HTMLInputElement>(null);

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

	const setFilesHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const files = event.target.files || [];
		Object.values(files).map(file => filesSize.current += file.size);
		setFiles(prev => prev.concat(...Object.values(files)));
	};

	const removeFilesHandler = (fileName: string, size: number): void => {
		filesSize.current -= size;
		setFiles(prev => prev.filter(file => file.name !== fileName));
		const filteredFiles = Object.values(inputRef.current!.files || {}).filter(value => value.name !== fileName);
		const DTInstanse = new DataTransfer();
		filteredFiles.forEach((file) => {
			DTInstanse.items.add(file);
		});
		inputRef.current!.files = DTInstanse.files;
	};

	const removeEmailsHandler = ({ msgId, msgSeq }:SelectedMailT):void => {
		sendMailStore.references = sendMailStore.references.filter(refer => refer.msgId !== msgId && refer.msgSeq !== msgSeq);
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
					html: mailText.current,
					files
				}
			);
			if (status) {
				mailStore.mailContentRoute = MailContentRoutes.mailsList;
				mutate('getBaseMailBoxesCount');
			}
			setIsSendDisabled(false);
		} catch {
			setIsSendDisabled(false);
		}
	};

	const fileSizeValidation = ():boolean => {
		return filesSize.current > FilesMaxSize;
	};

	const buttonCheckValidation = (): boolean => {
		return (!Boolean(emailTo.length) || isSendDisabled || fileSizeValidation());
	};

	useEffect(() => {
		setEmailTo(sendMailStore.mailTo);
	}, [sendMailStore.mailTo]);

	useEffect(() => {
		return () => {
			sendMailStore.clearPrevOptions();
		};
	}, []);
	return (
		<div className={cl['mail-send']}>
			<div className={cl['mail-send__inputs']}>
				<LabelInline label='Кому' >
					<InputTransparentMulti type='text' style={{ width: '100%' }} value={emailTo} onChangeHandler={setEmailToHandler} />
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
			<div className={cl['mail-send__references']}>
				{
					sendMailStore.references.map(mail => <Email removeEmailsHandler={removeEmailsHandler} mail={mail} key={mail?.msgSeq} />)
				}
			</div>
			<div className={cl['mail-send__files']}>
				{
					Array.isArray(files) && files.map((file: File) => <File removeFilesHandler={removeFilesHandler} file={file} key={file.name} />)
				}
			</div>
			<div className={cl['mail-send__btns']}>
				<ButtonYandex disabled={buttonCheckValidation()} clickHandler={sendActionHandler}>Отправить</ButtonYandex>
				<InputFile ref={inputRef} multiple setFilesHandler={setFilesHandler} />
				{
					Boolean(filesSize.current) &&
					<span
						className={cn(
							cl['mail-send__files-size'],
							{
								[cl['mail-send__files-size--danger']]: fileSizeValidation()
							})
						}
					>
						{ formatSizeUnits(filesSize.current) }
						{
							fileSizeValidation() && ' *размер прикрепленных файлов может быть не болee 20 МБ*'
						}
					</span>
				}
			</div>
		</div>
	);
});
