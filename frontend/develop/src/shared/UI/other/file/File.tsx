import React, { memo } from 'react';
import cl from './File.module.scss';
import { COLORS } from '../../../lib/consts';
import { takeFileExtension } from '../../../lib/helpers';
import { FileSvg, CrossSvg } from '../../../svg';
import { formatSizeUnits } from '../../../lib/helpers/formatSizeUnits';

type FileProps = {
	file: File
	removeFilesHandler: (fileName: string, size: number) => void
}

export const File = memo(({ file, removeFilesHandler }:FileProps):React.JSX.Element => {
	const isImage = file.type.includes('image');

	return (
		<div className={cl['file']}>
			<div className={cl['file__icon']}>
				{
					isImage
						? <img className={cl['file__img']} src={URL.createObjectURL(file)} alt={file.name} />
						: <FileSvg width='80' height='80' color={COLORS.font_base_color} />
				}
				<span className={cl['file__extension']}>
					{
						!isImage && takeFileExtension(file.name)
					}
				</span>
				<span className={cl['file__remove']}>
					<CrossSvg clickHandler={() => removeFilesHandler(file.name, file.size)} width='25' height='25' style={{ cursor: 'pointer' }} color={COLORS.red_color} />
				</span>
			</div>
			<div className={cl['file__name']}>
				<span className={cl['file__name-inner']} title={file.name}>
					{ file.name }
				</span>
			</div>
			<div className={cl['file__size']}>
				<span className={cl['file__size-inner']} title={file.name}>
					{ formatSizeUnits(file.size) }
				</span>
			</div>
		</div>
	);
});