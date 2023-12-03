import { makeAutoObservable } from 'mobx';
import { LoginDTO } from '../DTO/login.dto';
import { AuthService } from '../../api';
import { ACCESS_TOKEN_LS_KEY } from '../../lib/config';
import { RegistrationDTO } from '../DTO/registration.dto';


export default class AuthStore {
	private _isAuth:boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	get isAuth():boolean {
		return this._isAuth;
	}

	set isAuth(value: boolean) {
		this._isAuth = value;
	}

	async login(loginDTO: LoginDTO):Promise<void> {
		try {
			const { data: response } = await AuthService.login(loginDTO);
			const { accessToken } = response;
			console.log(response);
			localStorage.setItem(ACCESS_TOKEN_LS_KEY, accessToken);
			this.isAuth = true;
		} catch(e) {
			console.log(e);
		}
	}

	async registration(registrationDTO: RegistrationDTO):Promise<void> {
		try {
			const { data: response } = await AuthService.registration(registrationDTO);
			const { accessToken } = response;
			console.log(response);
			localStorage.setItem(ACCESS_TOKEN_LS_KEY, accessToken);
			this.isAuth = true;
		} catch(e) {
			console.log(e);
		}
	}

	async logout():Promise<void> {
		try {
			await AuthService.logout();
			localStorage.removeItem(ACCESS_TOKEN_LS_KEY);
			this.isAuth = false;
		} catch(e) {
			console.log(e);
		}
	}

}