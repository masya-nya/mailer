import React from 'react';
import { makeAutoObservable } from 'mobx';
import { FolderType, ActionsFoldersType } from '../../lib/types';
import { FOLDER_TEMPLATE } from '../../lib/config';
import { DELIMITER } from '../../../../shared/lib/types';

class FoldersStore {
	private _isCreateModalShow:boolean = false;
	private _actionType:ActionsFoldersType = 'createClear';
	private _focusedFolder:FolderType = FOLDER_TEMPLATE;
	private _delimiter: DELIMITER = '/';

	constructor () {
		makeAutoObservable(this);
	}

	public isCreateModalShowHandler (event?: React.SyntheticEvent): void {
		event && event.stopPropagation();
		this._isCreateModalShow && this.changeFocusedFolder(FOLDER_TEMPLATE);
		this._isCreateModalShow = !this._isCreateModalShow;
	}

	public changeFocusedFolder (newFolder:FolderType) {
		this._focusedFolder = newFolder;
	}

	get isCreateModalShow () {
		return this._isCreateModalShow;
	}

	get delimiter () {
		return this._delimiter;
	}

	set delimiter (newValue: DELIMITER) {
		this._delimiter = newValue;
	}

	get actionType () {
		return this._actionType;
	}

	set actionType (newAction:ActionsFoldersType) {
		this._actionType = newAction;
	}

	get focusedFolder () {
		return this._focusedFolder;
	}
}

export const foldersStore = new FoldersStore();
