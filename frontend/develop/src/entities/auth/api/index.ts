import $api from 'src/app/http';
import { AxiosResponse } from 'axios';
import { AuthResponseI } from '../model/schemas/login.schema';
import ENDPOINTS from 'src/app/lib/consts/endpoints';
import { LoginDTO } from '../model/DTO/login.dto';
import { RegistrationDTO } from '../model/DTO/registration.dto';
const { AUTH: { BASE, LOGIN, LOGOUT, REGISTRATION } } = ENDPOINTS;

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

}
