import { AxiosError } from 'axios';
import { notificationsStore } from '../../../entities/notification';
import { AxiosErrorResponseType } from '../types';

export const errorOutputHandler = (e: unknown) => {
	const err = e as AxiosError<AxiosErrorResponseType>;
	const { message, error } = err.response!.data;
	notificationsStore.addNotification(error, message, 'danger');
};