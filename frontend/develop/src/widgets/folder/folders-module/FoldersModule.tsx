import React, { useEffect } from 'react';
import cl from './FoldersModule.module.scss';
import { useFolders } from '../../../entities/folder';
import { useToggle } from '../../../shared/lib';
import { Loader, ErrorText } from '../../../shared/UI';
import FoldersHeading from './components/folders-heading/FoldersHeading';
import FoldersWrapper from './components/folders-wrapper/FoldersWrapper';

export const FoldersModule = (): React.JSX.Element => {
	const { data: folders, isLoading: foldersIsLoading, error: foldersIsError } = useFolders();
	const [isFoldersView, isFoldersViewHandler, setIsModalShow] = useToggle(false);

	useEffect(() => {
		setIsModalShow(Boolean(folders?.length) || false);
	}, [folders]);

	if (foldersIsLoading || !folders) {
		return <Loader />;
	}
	if (foldersIsError) {
		return <ErrorText title='Папка: Ошибка запроса' style={{ textAlign: 'center' }} />;
	}
	return (
		<div className={cl['folders-module']}>
			<FoldersHeading isFoldersViewHandler={isFoldersViewHandler} />
			{
				isFoldersView && <FoldersWrapper folders={folders} />
			}
		</div>
	);
};
