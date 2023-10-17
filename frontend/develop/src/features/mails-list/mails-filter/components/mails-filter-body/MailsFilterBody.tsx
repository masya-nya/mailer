import React from 'react';
import cl from './MailsFilterBody.module.scss';
import { MAILS_FILTER_CONF } from '../../lib/config';
import MailsFilterBodyItem from '../mails-filter-body-item/MailsFilterBodyItem';

type MailsFilterBodyProps = {
	setIsDroppedWindowOpen: React.Dispatch<boolean>
}

const MailsFilterBody = ({ setIsDroppedWindowOpen }:MailsFilterBodyProps):React.JSX.Element => {
	return (
		<div className={cl['mails-filter-body']}>
			{
				MAILS_FILTER_CONF.map(filter => <MailsFilterBodyItem title={filter.title} query={filter.query} queryValue={filter.queryValue} key={filter.title} setIsDroppedWindowOpen={setIsDroppedWindowOpen} />)
			}
		</div>
	);
};

export default MailsFilterBody;
