import React from 'react';
import cl from './FolderMovementModuleHeader.module.scss';
import cn from 'classnames';
import { COLORS } from '../../../../../shared/lib';
import { FolderSvg, ArrowDownSvg } from '../../../../../shared/svg';

type FolderMovementModuleHeaderProps = {
	onClickHandler: (event:React.MouseEvent<HTMLDivElement>) => void
	className?: string
}

const FolderMovementModuleHeader = ({ onClickHandler, className }:FolderMovementModuleHeaderProps):React.JSX.Element => {
	return (
		<div onClick={(event) => onClickHandler(event)} className={cn(cl['folder-change-header'], className)}>
			<FolderSvg width='20' height='20' color={COLORS.font_base_color} />
			<div className={cl['folder-change-header--inner']}>
				Папка
			</div>
			<ArrowDownSvg width='15' height='15' color={COLORS.font_base_color} />
		</div>
	);
};

export default FolderMovementModuleHeader;