import React, { useRef, useState } from 'react';
import cl from './AmoAction.module.scss';
import { createPortal } from 'react-dom';
import { ContextSelectWrapper, ContextMenuItem, ModalWrapper } from '../../../shared/UI';
import { AmoActionsConfT, AmoActionsConf, AmoActionTypesT } from '../../../entities/amo';
import { SelectedMailT, ServerMailT, useMails } from '../../../entities/mails-list';
import { ALetterSvg } from '../../../shared/svg';
import { COLORS } from '../../../shared/lib';
import AmoActionModalBody from './components/amo-action-modal-body/AmoActionModalBody';
import AmoIconSelect from './components/amo-icon-select/AmoIconSelect';

type AmoActionsProps = {
	selectedMails: SelectedMailT[]
}

export const AmoAction = ({ selectedMails }: AmoActionsProps): React.JSX.Element => {
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const actionType = useRef<AmoActionTypesT>();
	const { data } = useMails();

	const amoActionHandler = (type:AmoActionTypesT) => {
		actionType.current = type;
		setIsModalOpen(true);
	};

	const selectedMailsWithInfo = selectedMails.map(({ msgId, msgSeq }): (ServerMailT | null) => {
		const findedMail = data?.mails.find(mail => (mail.msgId === msgId && mail.msgSeq === msgSeq));
		if (findedMail) {
			return findedMail;
		}
		return null;
	});

	return (
		<>
			<div
				onMouseEnter={() => setIsSelectOpen(true)}
				onMouseLeave={() => setIsSelectOpen(false)}
				className={cl['amo-action']}>
				<ALetterSvg width='20' height='20' color={COLORS.blue_color} />
				<div className={cl['amo-action__text']}>
					Действия amoCRM
				</div>
				{
					isSelectOpen &&
					<ContextSelectWrapper top='30px' >
						{
							(Object.entries(AmoActionsConf) as [AmoActionTypesT, AmoActionsConfT][]).map(([key, action]) =>
								<ContextMenuItem title={action.title} onClickHandler={() => amoActionHandler(key)} key={key} >
									<AmoIconSelect type={key} />
								</ContextMenuItem>)
						}
					</ContextSelectWrapper>
				}
			</div>
			{
				isModalOpen &&
				createPortal(
					<ModalWrapper modalHandler={() => setIsModalOpen(prev => !prev)}>
						<AmoActionModalBody selectedMailsWithInfo={selectedMailsWithInfo} modalHandler={setIsModalOpen} actionType={actionType.current} />
					</ModalWrapper>
					, document.body
				)
			}
		</>
	);
};