import React, { forwardRef } from 'react';
import cl from './InputFile.module.scss';
import { COLORS } from '../../../lib/consts';
import { PaperClipSvg } from '../../../svg';

type InputFileProps = {
	setFilesHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
	multiple?: boolean
}

export const InputFile = forwardRef<HTMLInputElement, InputFileProps>(({ setFilesHandler, multiple = false }: InputFileProps, ref: React.Ref<HTMLInputElement>): React.JSX.Element => {
	return (
		<label className={cl['input-file']}>
			<PaperClipSvg width='24' height='24' color={COLORS.font_darker_color} />
			<input ref={ref} type="file" multiple={multiple} onChange={setFilesHandler} />
		</label>
	);
});
