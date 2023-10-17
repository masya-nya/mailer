import axios from 'axios';
import { BASE_URL } from '../../shared/lib/config';

export const $api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'ngrok-skip-browser-warning': true
	}
});