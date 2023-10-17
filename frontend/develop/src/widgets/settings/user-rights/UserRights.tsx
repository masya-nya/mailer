import React, { useEffect, useState } from 'react';
import cl from './UserRights.module.scss';
import UserRightsTable from './components/user-rights-table/UserRightsTable';
import { Button, ErrorText, LoaderCircle } from '../../../shared/UI';
import { useCorporateMailBoxes } from '../../../pages/mail-page/model/hooks/useMailBox';
import { IS_ADMIN, MailBox } from '../../../shared/lib';
import { userRightsService } from './api/user-rights.service';

export const UserRights = (): React.JSX.Element => {
	const { data: corporateMailboxes, mutate: mutateCorporateMailboxes } = useCorporateMailBoxes();
	const [mailBoxes, setMailBoxes] = useState<MailBox[]>([]);
	const [isFetching, setIsFetching] = useState<boolean>(false);

	const setMailBoxesHandler = (value: boolean, managerId: string, mailbox: MailBox): void => {
		if (value) {
			setMailBoxes((prev: MailBox[]) => {
				const oldMailboxes = [...prev];
				const currentMailboxIndx = oldMailboxes.findIndex(box => box.email === mailbox.email);
				oldMailboxes[currentMailboxIndx].unallowedManagers.push(managerId);
				return oldMailboxes;
			});
		} else {
			setMailBoxes((prev: MailBox[]) => {
				const oldMailboxes = [...prev];
				const currentMailboxIndx = oldMailboxes.findIndex(box => box.email === mailbox.email);
				oldMailboxes[currentMailboxIndx].unallowedManagers = oldMailboxes[currentMailboxIndx].unallowedManagers.filter(mngId => mngId !== managerId);
				return oldMailboxes;
			});
		}
	};

	const updateUsersRights = async (): Promise<void> => {
		setIsFetching(true);
		const status = await userRightsService.updateUserRights(mailBoxes);
		status && mutateCorporateMailboxes();
		setIsFetching(false);
	};

	useEffect(() => {
		if (corporateMailboxes) {
			const mailboxesClone = corporateMailboxes.map(box => structuredClone(box));
			setMailBoxes([...mailboxesClone]);
		}
	}, [corporateMailboxes]);

	if (!corporateMailboxes) {
		return <LoaderCircle />;
	}
	if (!IS_ADMIN) {
		return <ErrorText style={{ height: '100%' }} title='Разграничение прав доступно только для администрации аккаунта' />;
	}
	return (
		<>
			{
				(mailBoxes && Boolean(mailBoxes.length))
					? <div className={cl['user-rights']} >
						<div className={cl['user-rights__heading']}>
							<div className={cl['user-rights__titles']}>
								<div className={cl['user-rights__title']}>
									Разграниченние доступа к корпоративной почте
								</div>
								<div className={cl['user-rights__subtitle']}>
									Выставляя крестик напротив менеджера вы запрещаете ему доступ к конкретной корпоративной почте
								</div>
							</div>
							<div className={cl['user-rights__btns']}>
								<Button disabled={isFetching} type='accent' clickHandler={updateUsersRights}>Сохранить</Button>
							</div>
						</div>
						<div className={cl['user-rights__table']}>
							<UserRightsTable mailBoxes={mailBoxes} setMailBoxesHandler={setMailBoxesHandler} />
						</div>
					</div >
					: <ErrorText title='Не подключено ни одной корпоративной почты' />
			}
		</>
	);
};
