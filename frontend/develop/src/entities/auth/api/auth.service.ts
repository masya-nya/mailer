import $api from 'src/app/http';
import axios, { AxiosResponse } from 'axios';
import { AuthResponseI } from '../model/schemas/login.schema';
import ENDPOINTS from 'src/app/lib/consts/endpoints';
import { LoginDTO } from '../model/DTO/login.dto';
import { RegistrationDTO } from '../model/DTO/registration.dto';
import { UserI } from 'src/entities/user/model/schemas/user.schema';
import { API_URL } from 'src/app/lib/config';
const { AUTH: { BASE, LOGIN, LOGOUT, REGISTRATION }, USER: { BASE: USER_BASE } } = ENDPOINTS;

export class AuthService {

	static async registration(registrationDTO: RegistrationDTO): Promise<AxiosResponse<AuthResponseI>> {
		return $api.post(`/${BASE}/${REGISTRATION}`, registrationDTO);
	}

	static async login(loginDTO: LoginDTO): Promise<AxiosResponse<AuthResponseI>> {
		return $api.post(`/${BASE}/${LOGIN}`, loginDTO);
	}

	static async logout(): Promise<void> {
		return $api.post(`/${BASE}/${LOGOUT}`);
	}

	static async refresh(): Promise<AxiosResponse<AuthResponseI>> {
		return axios.get<AuthResponseI>(`${API_URL}/auth/refresh`, { withCredentials: true });
	}

	static async getUsers(): Promise<AxiosResponse<UserI[]>> {
		return $api.get(`/${USER_BASE}`);
	}

}
