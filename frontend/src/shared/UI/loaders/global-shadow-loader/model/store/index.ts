import { makeAutoObservable } from 'mobx';


export class GlobalShadowLoaderStore {
	private _isLoad:boolean = false;

	constructor () {
		makeAutoObservable(this);
	}

	get isLoad(): boolean {
		return this._isLoad;
	}

	set isLoad(value: boolean) {
		this._isLoad = value;
	}

}
export const globalShadowLoaderStore = new GlobalShadowLoaderStore();