import React from 'react';
import cl from './FoldersCreateParent.module.scss';
import Select, { SingleValue, ActionMeta } from 'react-select';
import { BaseOptionType } from '../../../../../shared/lib';

type FoldersCreateParentProps = {
	parentFolder: BaseOptionType<string> | null,
	setParentFolder: (option: SingleValue<BaseOptionType<string>>, actionMeta: ActionMeta<BaseOptionType<string>>) => void,
	folderAsOptions: BaseOptionType<string>[]
}

const FoldersCreateParent = ({ parentFolder, setParentFolder, folderAsOptions }:FoldersCreateParentProps): React.JSX.Element => {
	const styles = {
		container: (base: object) => ({
			...base,
			width: '100%',
			fontSize: '15px'
		})
	};

	return (
		<div className={cl['folders-create__parent']}>
			<div className={cl['folders-create__label']}>
				Вложить в:
			</div>
			<Select isClearable={true} defaultValue={parentFolder} onChange={setParentFolder} isSearchable={true} options={folderAsOptions} styles={styles} placeholder='Не вкладывать' />
		</div>
	);
};

export default FoldersCreateParent;
