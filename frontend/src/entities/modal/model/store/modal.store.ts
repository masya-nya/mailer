import { ReactNode } from 'react';
import { makeAutoObservable } from 'mobx';


export class ModalStore {
	private _isOpen: boolean = false;
	private _children: ReactNode = null;

	get isOpen(): boolean {
		return this._isOpen;
	}

	set isOpen(value: boolean) {
		this._isOpen = value;
	}

	get children(): ReactNode {
		return this._children;
	}

	set children(value: ReactNode) {
		this._children = value;
	}

	constructor() {
		makeAutoObservable(this);
	}
}

export const modalStore = new ModalStore();