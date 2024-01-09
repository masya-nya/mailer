import React from 'react';
import cl from './MailAttachments.module.scss';
import { AttachmentT } from '../../../../../entities/mails-list';
import { Attachment } from './../../../../../shared/UI';

type MailAttachmentsProps = {
	attachments: AttachmentT[]
}

const MailAttachments = ({ attachments }: MailAttachmentsProps): React.JSX.Element => {
	return (
		<div className={cl['attachments']}>
			{
				attachments.map((attachment) => <Attachment attachment={attachment} key={attachment.fileName} />)
			}
		</div>
	);
};

export default MailAttachments;