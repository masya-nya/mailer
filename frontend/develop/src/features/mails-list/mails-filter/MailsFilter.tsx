import React, { useRef } from 'react';
import cl from './MailsFilter.module.scss';
import cn from 'classnames';
import MailsFilterHeader from './components/mails-filter-header/MailsFilterHeader';
import MailsFilterBody from './components/mails-filter-body/MailsFilterBody';
import { useDroppedWindow } from '../../../shared/lib';
import { DroppedWindowWrapper } from '../../../shared/UI';

type MailsFilterProps = {
	className?: string
}

export const MailsFilter = ({ className }:MailsFilterProps):React.JSX.Element => {
	const { current: DROPPED_WINDOW_WRAPPER_WIDTH } = useRef<number>(250);
	const { current: TOP_MARGIN } = useRef<number>(5);
	const { current: classForTargeting } = useRef<string>('marks-adding--target');
	const [isDroppedWindowOpen, setIsDroppedWindowOpen, points, droppeWindowHandler] = useDroppedWindow(classForTargeting);
	return (
		<div className={cn(cl['mails-filter'], className)}>
			<MailsFilterHeader onClickHandler={droppeWindowHandler} className={classForTargeting} />
			{
				isDroppedWindowOpen &&
				<DroppedWindowWrapper top={points.y + TOP_MARGIN} left={points.right - DROPPED_WINDOW_WRAPPER_WIDTH} width={DROPPED_WINDOW_WRAPPER_WIDTH} isMenuOpenHandler={setIsDroppedWindowOpen}>
					<MailsFilterBody setIsDroppedWindowOpen={setIsDroppedWindowOpen} />
				</DroppedWindowWrapper>
			}
		</div>
	);
};
