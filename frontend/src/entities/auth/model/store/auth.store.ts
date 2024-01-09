import { makeAutoObservable } from 'mobx';
import { LoginDTO } from '../DTO/login.dto';
import { AuthService } from '../../api/auth.service';
import { ACCESS_TOKEN_LS_KEY } from '../../lib/config';
import { RegistrationDTO } from '../DTO/registration.dto';
import { UserI } from 'src/entities/user/model/schemas/user.schema';
import { globalShadowLoaderStore } from 'src/shared/UI';
import { AccountPopulateI } from 'src/entities/account';


export class AuthStore {
	private _isAuth:boolean = false;
	private _isAuthInProgress:boolean = false;
	private _user: UserI | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	get accounts(): AccountPopulateI[] {
		return this._user?.accounts || [];
	}

	get isAuthInProgress():boolean {
		return this._isAuthInProgress;
	}

	get user():UserI | null {
		return this._user;
	}

	set user(value: UserI | null) {
		this._user = value;
	}

	get isAuth():boolean {
		return this._isAuth;
	}

	set isAuth(value: boolean) {
		this._isAuth = value;
	}

	async login(loginDTO: LoginDTO):Promise<boolean> {
		globalShadowLoaderStore.isLoad = true;
		try {
			const { data: response } = await AuthService.login(loginDTO);
			const { accessToken, user } = response;
			this._user = user;
			console.log(response);
			localStorage.setItem(ACCESS_TOKEN_LS_KEY, accessToken);
			this._isAuth = true;
			return true;
		} catch(e) {
			console.log(e);
			globalShadowLoaderStore.isLoad = false;
			return false;
		} finally {
			globalShadowLoaderStore.isLoad = false;
		}
	}

	async registration(registrationDTO: RegistrationDTO):Promise<boolean> {
		globalShadowLoaderStore.isLoad = true;
		try {
			const { data: response } = await AuthService.registration(registrationDTO);
			const { accessToken, user } = response;
			this._user = user;
			console.log(response);
			localStorage.setItem(ACCESS_TOKEN_LS_KEY, accessToken);
			this._isAuth = true;
			return true;
		} catch(e) {
			console.log(e);
			globalShadowLoaderStore.isLoad = false;
			return false;
		} finally {
			globalShadowLoaderStore.isLoad = false;
		}
	}

	async logout():Promise<boolean> {
		globalShadowLoaderStore.isLoad = true;
		try {
			await AuthService.logout();
			localStorage.removeItem(ACCESS_TOKEN_LS_KEY);
			this._isAuth = false;
			return true;
		} catch(e) {
			console.log(e);
			globalShadowLoaderStore.isLoad = false;
			return false;
		} finally {
			globalShadowLoaderStore.isLoad = false;
		}
	}

	async checkAuth():Promise<boolean> {
		this._isAuthInProgress = true;
		try {
			const { data } = await AuthService.refresh();
			localStorage.setItem(ACCESS_TOKEN_LS_KEY, data.accessToken);
			this._user = data.user;
			console.log('REFRESH TOKEN', this._user);
			this._isAuth = true;
			return true;
		} catch(e) {
			console.log(e);
			return false;
		} finally {
			this._isAuthInProgress = false;
		}
	}

	async getUsers(): Promise<UserI[]> {
		const { data } = await AuthService.getUsers();
		console.log('Users', data);
		return data;
	}

}

export const authStore = new AuthStore();