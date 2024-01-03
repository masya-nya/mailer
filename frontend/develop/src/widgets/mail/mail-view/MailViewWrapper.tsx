import React, { useEffect, useState } from 'react';
import { mailService } from '../../../entities/mail';
import { Loader, ErrorWindow } from '../../../shared/UI';
import { mailsService, MailT, FLAGS } from '../../../entities/mails-list';
import { MailView } from './components/mail-view/MailView';
import { emailStore } from 'src/entities/email';

const MailViewWrapper = (): React.JSX.Element => {
	const [mail, setMail] = useState<MailT | null>(null);
	const [isLoadingMail, setIsLoadingMail] = useState(true);

	const fetchMail = async (): Promise<void> => {
		try {
			if (emailStore.selectedMailIdentifier) {
				await mailsService.addMsgFlag(FLAGS.seen, [emailStore.selectedMailIdentifier]);
				const gottenMail = await mailService.getMailBySeq();
				if (gottenMail) {
					setMail(gottenMail);
				}
			}
		} catch (error) {
			console.log(error);
		}
		setIsLoadingMail(false);
	};

	useEffect(() => {
		fetchMail();
	}, []);

	if (isLoadingMail) {
		return <Loader/>;
	}

	if (!mail) {
		return <ErrorWindow messages={['Error getting mail']} title='Network Error' />;
	}

	return (
		<MailView mail={mail}/>
	);
};

export default MailViewWrapper;