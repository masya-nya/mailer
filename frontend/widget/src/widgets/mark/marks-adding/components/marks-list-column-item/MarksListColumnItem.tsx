import React from 'react';
import cl from './MarksListColumnItem.module.scss';
import { SelectedMailT } from '../../../../../entities/mails-list';
import { marksService, MarkType } from '../../../../../entities/mark';
import { Mark } from '../../../../../shared/UI';
import { appShadowLoaderStore } from '../../../../../features/general';

type MarksListColumnItemProps = {
	mark: MarkType
	selectedMails: SelectedMailT[]
	setIsDroppedWindowOpen: React.Dispatch<boolean>
	forRemove?: boolean
    mutateMarks: (option: string, isRemove: boolean) => void
}

const MarksListColumnItem = ({ mark, selectedMails, setIsDroppedWindowOpen, forRemove = false, mutateMarks }:MarksListColumnItemProps):React.JSX.Element => {
	const addMark = async ():Promise<void> => {
		appShadowLoaderStore.isLoading = true;
		const status = await marksService.addMark([mark._id], selectedMails);
		status && await mutateMarks(mark._id, forRemove);
		setIsDroppedWindowOpen(false);
		appShadowLoaderStore.isLoading = false;
	};
	const removeMark = async ():Promise<void> => {
		appShadowLoaderStore.isLoading = true;
		const status = await marksService.removeMark([mark._id], selectedMails);
		status && await mutateMarks(mark._id, forRemove);
		setIsDroppedWindowOpen(false);
		appShadowLoaderStore.isLoading = false;
	};

	return (
		<div onClick={forRemove ? removeMark : addMark} className={cl['marks-list-column-item']}>
			<div className={cl['marks-list-column-item__inner']}>
				<Mark title={mark.name} color={mark.color} />
			</div>
		</div>
	);
};

export default MarksListColumnItem;