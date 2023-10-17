import { makeAutoObservable } from 'mobx';
import { MARK_TEMPLATE } from '../../lib/config';
import { MarkType } from '../../lib/types';

class MarksStore {
	private _isCreateModalShow = false;
	private _focusedMark: MarkType = MARK_TEMPLATE;

	constructor () {
		makeAutoObservable(this);
	}

	public isCreateModalShowHandler (): void {
		if (this._isCreateModalShow) this.focusedMark = MARK_TEMPLATE;
		this._isCreateModalShow = !this._isCreateModalShow;
	}

	get isCreateModalShow () {
		return this._isCreateModalShow;
	}

	get focusedMark () {
		return this._focusedMark;
	}

	set focusedMark (newMark: MarkType) {
		this._focusedMark = newMark;
	}
}

export const marksStore = new MarksStore();
