import React from 'react';
import { BASE_MAIL_TYPES } from '../../../../../entities/mail-boxes/lib/consts';
import { COLORS } from '../../../../../shared/lib/consts';
import { IncomingSvg, SendSvg, DeleteSvg, SpamSvg, FolderSvg } from '../../../../../shared/svg';

type FolderIconSelectorProps = {
	folderPath: string
}

const FolderIconSelector = ({ folderPath }:FolderIconSelectorProps):React.JSX.Element => {
	const SelectedIcon = ():React.JSX.Element => {
		switch (folderPath) {
			case BASE_MAIL_TYPES.inbox.value: return <IncomingSvg width='15' height='15' color={COLORS.font_base_color} />;
			case BASE_MAIL_TYPES.sent.value: return <SendSvg width='15' height='15' color={COLORS.font_base_color} />;
			case BASE_MAIL_TYPES.deleted.value: return <DeleteSvg width='15' height='15' color={COLORS.font_base_color} />;
			case BASE_MAIL_TYPES.spam.value: return <SpamSvg width='15' height='15' color={COLORS.font_base_color} />;
			default: return <FolderSvg width='15' height='15' color={COLORS.font_base_color} />;
		}
	};
	return (
		<>
			{
				<SelectedIcon />
			}
		</>
	);
};

export default FolderIconSelector;