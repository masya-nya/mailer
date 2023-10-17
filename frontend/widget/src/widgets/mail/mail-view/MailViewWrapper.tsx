import React, { useEffect, useState } from 'react';
import { mailService } from '../../../entities/mail';
import { mailStore } from '../../../modules/mail-module';
import { LoaderCircle, ErrorWindow } from '../../../shared/UI';
import { mailsService, MailT, FLAGS } from '../../../entities/mails-list';
import { MarkType, useMarks } from '../../../entities/mark';
import { MailView } from './components/mail-view/MailView';

const MailViewWrapper = (): React.JSX.Element => {
	const [mail, setMail] = useState<MailT | null>(null);
	const [isLoadingMail, setIsLoadingMail] = useState(true);
	const [mailMarks, setMailMarks] = useState<MarkType[]>([]);
	const { data: allMarks } = useMarks();

	const fetchMail = async (): Promise<void> => {
		try {
			if (mailStore.selectedMailIdentifier) {
				await mailsService.addMsgFlag(FLAGS.seen, [mailStore.selectedMailIdentifier]);
				const gottenMail = await mailService.getMailBySeq();
				if (gottenMail) {
					setMail(gottenMail);
					setMailMarks(allMarks!.filter((mark) => gottenMail.marks.includes(mark._id)));
				}
			}
		} catch (error) {}
		setIsLoadingMail(false);
	};

	const updateMarks = (markId: string, isRemoving: boolean): void => {
		if (mail && mail.marks.includes(markId) === isRemoving) {
			const treatedMarks = mail.marks.filter((id) => id !== markId);
			const updatedMarks = isRemoving ? treatedMarks : [...treatedMarks, markId];

			setMail({ ...mail, marks: updatedMarks });
			setMailMarks(allMarks!.filter((mark) => updatedMarks.includes(mark._id)));
		}
	};

	useEffect(() => {
		fetchMail();
	}, []);

	if (isLoadingMail) {
		return <LoaderCircle/>;
	}

	if (!mail) {
		return <ErrorWindow messages={['Error getting mail']} title='Network Error' />;
	}

	return (
		<MailView mail={mail} mailMarks={mailMarks} updateMarks={updateMarks}/>
	);
};

export default MailViewWrapper;