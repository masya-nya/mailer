import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';

export const useFiles = (
	filesValue: File[]
): [
    File[],
    number,
    React.RefObject<HTMLInputElement>,
    (event: React.ChangeEvent<HTMLInputElement>) => void,
    (fileName: string, size: number) => void
] => {
	const [files, setFiles] = useState<File[]>(filesValue);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const setFilesHandler = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			const files = event.target.files || [];
			setFiles((prev) => prev.concat(...Object.values(files)));
		},
		[]
	);

	const removeFilesHandler = useCallback((fileName: string): void => {
		setFiles((prev) => prev.filter((file) => file.name !== fileName));
		const filteredFiles = Object.values(
            fileInputRef.current!.files || {}
		).filter((value) => value.name !== fileName);
		const DTInstanse = new DataTransfer();
		filteredFiles.forEach((file) => {
			DTInstanse.items.add(file);
		});
        fileInputRef.current!.files = DTInstanse.files;
	}, []);

	const filesSize = useMemo(() => {
		return files.reduce((accum, file) => accum + file.size, 0);
	}, [files]);

	useEffect(() => {
		console.log('USEEFFECT');
		setFiles([...filesValue]);
	}, [filesValue]);

	return [
		files,
		filesSize,
		fileInputRef,
		setFilesHandler,
		removeFilesHandler
	];
};
