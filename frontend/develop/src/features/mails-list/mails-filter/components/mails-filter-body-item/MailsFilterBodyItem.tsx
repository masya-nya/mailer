import React from 'react';
import cl from './MailsFilterBodyItem.module.scss';
import { useSWRConfig } from 'swr';
import { FLAGS_KEYS } from '../../../../../entities/mails-list';
import { FilterQueryT, mailStore } from '../../../../../modules/mail-module';
import { UnreadSvg, ImportantSvg, CheckMarkSvg } from '../../../../../shared/svg';
import { COLORS } from '../../../../../shared/lib';

type MailsFilterBodyItemProps = {
	title: string
	query: FilterQueryT
	queryValue: boolean
	setIsDroppedWindowOpen: React.Dispatch<boolean>
}

const MailsFilterBodyItem = ({ title, query, queryValue, setIsDroppedWindowOpen }:MailsFilterBodyItemProps):React.JSX.Element => {
	const { cache, mutate } = useSWRConfig();

	const SvgIconSelect = (query: string):React.JSX.Element => {
		switch (query) {
			case FLAGS_KEYS.seen: return <UnreadSvg width='10' height='10' color={COLORS.font_base_color} />;
			case FLAGS_KEYS.important: return <ImportantSvg width='18' height='18' color={COLORS.red_color} colorBG={COLORS.red_color} />;
			default: return <></>;
		}
	};

	const switchFilterHandler = ():void => {
		mailStore.mailsFilter = { filterQuery: query, filterQueryValue: queryValue, page: 1 };
		setIsDroppedWindowOpen(false);
		cache.delete('getMails');
		mutate('getMails');
	};

	return (
		<div onClick={switchFilterHandler} className={cl['mails-filter-body-item']}>
			<div className={cl['mails-filter-body-item__icon']}>
				{ SvgIconSelect(query) }
			</div>
			<div className={cl['mails-filter-body-item__text']}>
				{ title }
			</div>
			{ mailStore.mailsFilter.filterQuery === query ? <CheckMarkSvg width='15' height='15' color={COLORS.font_base_color} /> : <></> }
		</div>
	);
};

export default MailsFilterBodyItem;
