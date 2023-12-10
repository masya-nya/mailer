import { makeAutoObservable } from 'mobx';
import { LoginDTO } from '../DTO/login.dto';
import { AuthService } from '../../api';
import { ACCESS_TOKEN_LS_KEY } from '../../lib/config';
import { RegistrationDTO } from '../DTO/registration.dto';
import { UserI } from 'src/entities/user/model/schemas/user.schema';


export default class AuthStore {
	private _isAuth:boolean = false;
	private _isAuthInProgress:boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	get isAuthInProgress():boolean {
		return this._isAuthInProgress;
	}

	get isAuth():boolean {
		return this._isAuth;
	}

	set isAuth(value: boolean) {
		this._isAuth = value;
	}

	async login(loginDTO: LoginDTO):Promise<boolean> {
		this._isAuthInProgress = true;
		try {
			const { data: response } = await AuthService.login(loginDTO);
			const { accessToken } = response;
			console.log(response);
			localStorage.setItem(ACCESS_TOKEN_LS_KEY, accessToken);
			this._isAuth = true;
			return true;
		} catch(e) {
			console.log(e);
			return false;
		} finally {
			this._isAuthInProgress = false;
		}
	}

	async registration(registrationDTO: RegistrationDTO):Promise<boolean> {
		this._isAuthInProgress = true;
		try {
			const { data: response } = await AuthService.registration(registrationDTO);
			const { accessToken } = response;
			console.log(response);
			localStorage.setItem(ACCESS_TOKEN_LS_KEY, accessToken);
			this._isAuth = true;
			return true;
		} catch(e) {
			console.log(e);
			return false;
		} finally {
			this._isAuthInProgress = false;
		}
	}

	async logout():Promise<boolean> {
		this._isAuthInProgress = true;
		try {
			await AuthService.logout();
			localStorage.removeItem(ACCESS_TOKEN_LS_KEY);
			this._isAuth = false;
			return true;
		} catch(e) {
			console.log(e);
			return false;
		} finally {
			this._isAuthInProgress = false;
		}
	}

	async checkAuth():Promise<boolean> {
		this._isAuthInProgress = true;
		try {
			const { data } = await AuthService.refresh();
			console.log('checkAuth', data);
			localStorage.setItem(ACCESS_TOKEN_LS_KEY, data.accessToken);
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