import React from 'react';
import cl from './Attachment.module.scss';
import { COLORS } from '../../../lib/consts';
import { takeFileExtension } from '../../../lib/helpers';
import { FileSvg } from '../../../svg';
import { AttachmentT } from '../../../../entities/mails-list/lib/types';

type AttachmentProps = {
	attachment: AttachmentT
}

export const Attachment = ({ attachment }:AttachmentProps):React.JSX.Element => {
	const isImage = attachment.content.includes('image');

	return (
		<a
			className={cl['attachment']}
			href={attachment.content}
			key={attachment.fileName}
			title={attachment.fileName}
			download={attachment.fileName}
		>
			<div className={cl['attachment__icon']}>
				{
					isImage
						? <img className={cl['attachment__img']} src={attachment.content} />
						: <FileSvg width='80' height='80' color={COLORS.font_base_color} />
				}
				<span className={cl['attachment__extension']}>
					{
						!isImage && takeFileExtension(attachment.fileName)
					}
				</span>
			</div>
			<div className={cl['attachment__name']}>
				<span className={cl['attachment__name-inner']} title={attachment.fileName}>
					{ attachment.fileName }
				</span>
			</div>
		</a>
	);
};