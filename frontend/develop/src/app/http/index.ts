import axios from 'axios';
import { API_URL } from '../lib/config';
import { ACCESS_TOKEN_LS_KEY } from 'src/entities/auth/lib/config';
import { AuthService } from 'src/entities/auth/api/auth.service';

const $api = axios.create({
	baseURL: API_URL,
	withCredentials: true
});

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN_LS_KEY)}`;
	return config;
});

$api.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && error.config && !originalRequest._isRetry) {
			originalRequest._isRetry = true;
			try {
				const { data: { accessToken } } = await AuthService.refresh();
				localStorage.setItem(ACCESS_TOKEN_LS_KEY, accessToken);
				return $api.request(originalRequest);
			} catch (e)  {
				console.log(e);
			}
		}
		throw error;
	}
);

export default $api;