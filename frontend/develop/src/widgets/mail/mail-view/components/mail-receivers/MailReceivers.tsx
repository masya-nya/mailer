import React, { useState } from 'react';
import cl from './MailReceivers.module.scss';
import cn from 'classnames';
import { FromToT } from '../../../../../entities/mails-list';
import { ArrowUpSvg, ArrowDownSvg } from '../../../../../shared/svg';
import { AvatarStub } from '../../../../../shared/UI';

type MailReceiversProps = {
	receivers: FromToT;
}

const MailReceivers = ({ receivers }: MailReceiversProps): React.JSX.Element => {
	const [isReceiversListActive, setIsReceiversListActive] = useState(false);

	return (
		<>
			<span
				className={cl['mail-receivers__count']}
				onClick={() => setIsReceiversListActive((prev) => !prev)}
			>
				получатели: {receivers.value.length}
				<span className={cl['mail-receivers__arrow']}>
					{
						isReceiversListActive
							? <ArrowUpSvg height='10' width='10'/>
							: <ArrowDownSvg height='10' width='10'/>
					}
				</span>
			</span>
			<div className={cn(cl['mail-receivers__list'], { [cl['_active']]: isReceiversListActive })}>
				{
					receivers.value.map((to) =>
						<span
							className={cl['mail-receivers__list-item']}
							key={to.address}
						>
							<AvatarStub
								name={to.name}
								address={to.address}
								style={{ height: '20px', width: '20px', fontSize: '11px' }}
							/>
							{to.address}
						</span>
					)
				}
			</div>
		</>
	);
};

export default MailReceivers;