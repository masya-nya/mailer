import axios from 'axios';
import { API_URL } from '../lib/config';
import { ACCESS_TOKEN_LS_KEY } from 'src/entities/auth/lib/config';

const $api = axios.create({
	baseURL: API_URL,
	withCredentials: true
});

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN_LS_KEY)}`;
	return config;
});

export default $api;