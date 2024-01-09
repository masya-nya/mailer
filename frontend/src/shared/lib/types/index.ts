import { AxiosError } from 'axios';
import { ReactNode } from 'react';
import { KeyedMutator } from 'swr';

export type AxiosErrorResponseType = {
    error: string,
    message: string[],
    statusCode: number
}

export type useSWRReturnType<T> = {
    data: T | undefined
    isLoading: boolean
	isValidating: boolean
    error: AxiosError<AxiosErrorResponseType>
    mutate: KeyedMutator<T>
};

export type BaseOptionType<T> = {
	value: T
	label: string
}

export type SelectOptionsT<T = string, U = string> = {
    value: T
    label: U
}

export type ConfItemT<T, K = string> = {
	value: T,
	title: K,
	icon: ReactNode
}

export type StatusResponseType = { status: boolean }
export type MailServicesType = 'google' | 'yandex'
export type MailIMAPServicesType = 'Google' | 'Yandex'