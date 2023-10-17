import React from 'react';
import cl from './RefreshButton.module.scss';
import { RefreshSvg } from '../../../../shared/svg';
import { mailStore } from '../..';
import { useSWRConfig } from 'swr';
import { COLORS, SWRFethingKeys } from '../../../../shared/lib';

const RefreshButton = ():React.JSX.Element => {
	const { mutate } = useSWRConfig();
	const mutateSwrList = (mutateKeys: SWRFethingKeys[]):void => {
		mutateKeys.forEach(key => mutate(key));
	};

	const refresh = ():void => {
		if (mailStore.mail) {
			mailStore.mail && mailStore.changeAllFetchingStatuses(true);
			mailStore.resetFilterSettings();
			mutateSwrList(['getFolders', 'getMarks', 'getBaseMailBoxesCount', 'getMails']);
		}
	};

	return (
		<div onClick={refresh} className={cl['refresh-button']}>
			<div className={cl['refresh-button__container']}>
				<RefreshSvg width='17' height='17' color={COLORS.black_color} />
			</div>
		</div>
	);
};

export default RefreshButton;
