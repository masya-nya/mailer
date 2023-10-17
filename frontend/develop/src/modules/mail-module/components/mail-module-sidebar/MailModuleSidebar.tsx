import React from 'react';
import cl from './MailModuleSidebar.module.scss';
import cn from 'classnames';
import WriteButton from '../write-button/WriteButton';
import RefreshButton from '../refresh-button/RefreshButton';
import { FoldersModule } from '../../../../widgets/folder';
import { MarksModule } from '../../../../widgets/mark';
import { MailBoxes } from '../../../../widgets/mail-boxes';

const MailModuleSidebar = ():React.JSX.Element => {
	return (
		<div className={cn(cl['mailmodule__sidebar'], cl['mailmodule-sidebar'])}>
			<div className={cl['mailmodule-sidebar__write-refresh']}>
				<WriteButton className={cl['mailmodule-sidebar__write']} />
				<RefreshButton />
			</div>
			<div className={cl['mailmodule-sidebar__base-types']}>
				<MailBoxes />
			</div>
			<div className={cl['mailmodule-sidebar__marks']}>
				<MarksModule />
			</div>
			<div className={cl['mailmodule-sidebar__folders']}>
				<FoldersModule/>
			</div>
		</div>
	);
};

export default MailModuleSidebar;
