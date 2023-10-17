import { makeAutoObservable } from 'mobx';

class AppShadowLoaderStore {
	private _isLoading = false;

	constructor () {
		makeAutoObservable(this);
	}

	get isLoading () {
		return this._isLoading;
	}

	set isLoading (value: boolean) {
		this._isLoading = value;
	}
}

export const appShadowLoaderStore = new AppShadowLoaderStore();