import React, { useRef } from 'react';
import cl from './FolderMovementModule.module.scss';
import { SelectedMailT } from '../../../entities/mails-list';
import { DroppedWindowWrapper } from '../../../shared/UI';
import { useDroppedWindow } from '../../../shared/lib';
import FolderMovementModuleBody from './components/folder-movement-module-body/FolderMovementModuleBody';
import FolderMovementModuleHeader from './components/folder-movement-module-header/FolderMovementModuleHeader';

type FolderMovementModuleProps = {
	selectedMails: SelectedMailT[]
}

export const FolderMovementModule = ({ selectedMails }:FolderMovementModuleProps): React.JSX.Element => {
	const { current: DROPPED_WINDOW_WRAPPER_WIDTH } = useRef<number>(250);
	const { current: TOP_MARGIN } = useRef<number>(5);
	const { current: classForTargeting } = useRef<string>('folder-movement-module--target');
	const [isDroppedWindowOpen, setIsDroppedWindowOpen, points, droppeWindowHandler] = useDroppedWindow(classForTargeting);
	const left = points.x - DROPPED_WINDOW_WRAPPER_WIDTH / 2;

	return (
		<div className={cl['folder-movement-module']}>
			<FolderMovementModuleHeader onClickHandler={droppeWindowHandler} className={classForTargeting} />
			{
				isDroppedWindowOpen &&
				<DroppedWindowWrapper top={points.y + TOP_MARGIN} width={DROPPED_WINDOW_WRAPPER_WIDTH} left={left} isMenuOpenHandler={setIsDroppedWindowOpen}>
					<FolderMovementModuleBody setIsDroppedWindowOpen={setIsDroppedWindowOpen} selectedMails={selectedMails} />
				</DroppedWindowWrapper>
			}
		</div>
	);
};