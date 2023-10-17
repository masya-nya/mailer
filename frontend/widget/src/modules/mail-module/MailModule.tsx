import React, { useEffect } from 'react';
import cl from './MailModule.module.scss';
import { observer } from 'mobx-react-lite';
import { useSWRConfig } from 'swr';
import { ShadowLoaderWrapper, LoaderCircle } from '../../shared/UI';
import { MailBox, SWRFethingKeys, IMAPServiceNames } from '../../shared/lib';
import { AuthorizationModule } from '../../widgets/authorization';
import { mailStore } from './model/store/mail-module.store';
import { foldersStore } from '../../entities/folder';
import MailModuleContent from './components/mail-module-content/MailModuleContent';
import MailModuleSidebar from './components/mail-module-sidebar/MailModuleSidebar';

type MailModuleProps = {
	mail: MailBox | null
}

export const MailModule = observer(({ mail }: MailModuleProps): React.JSX.Element => {
	const { mutate } = useSWRConfig();

	const mutateSwrList = (mutateKeys: SWRFethingKeys[]):void => {
		mutateKeys.forEach(key => mutate(key));
	};

	useEffect(() => {
		if (mailStore.mail) {
			mailStore.mail && mailStore.changeAllFetchingStatuses(true);
			mutateSwrList(['getFolders', 'getMarks', 'getBaseMailBoxesCount', 'getMails']);
		}
	}, [mailStore.mail]);

	useEffect(() => {
		foldersStore.delimiter = mail?.serviceName === IMAPServiceNames.Yandex ? '|' : '/';
	});

	return (
		<div className={cl['mailmodule']}>
			{
				mail
					? <>
						<MailModuleSidebar />
						<MailModuleContent />
					</>
					: <AuthorizationModule />
			}
			{
				mailStore.isMailModuleFetching && <ShadowLoaderWrapper><LoaderCircle /></ShadowLoaderWrapper>
			}
		</div>
	);
});