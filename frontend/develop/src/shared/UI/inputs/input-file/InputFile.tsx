import React, { forwardRef } from 'react';
import cl from './InputFile.module.scss';
import { SWGColors } from '../../../lib/consts';
import { PaperClipSvg } from '../../../svg';

type InputFileProps = {
	setFilesHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
	multiple?: boolean;
};

export const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
	(
		{ setFilesHandler, multiple = false }: InputFileProps,
		ref: React.Ref<HTMLInputElement>
	): React.JSX.Element => {
		return (
			<label className={cl['input-file']}>
				<PaperClipSvg
					width="24px"
					height="24px"
					color={SWGColors.grey}
				/>
				<input
					ref={ref}
					type="file"
					multiple={multiple}
					onChange={setFilesHandler}
				/>
			</label>
		);
	}
);
