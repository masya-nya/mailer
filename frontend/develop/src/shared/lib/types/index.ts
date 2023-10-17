import React from 'react';
import { KeyedMutator } from 'swr';
import { AxiosError } from 'axios';

export type HEX = `#${string}` | 'transparent';
export type DELIMITER = '|' | '/'
export type AxiosErrorResponseType = {
    error: string,
    message: string[],
    statusCode: number
}

export type YamailerRouteT<T> = {
	value: T,
	title: string,
	Component: React.JSX.Element
}

export type ConfItemT<T, K = string> = {
	value: T,
	title: K,
	icon: React.JSX.Element
}
export type useSWRReturnType<T> = {
    data: T | undefined;
    isLoading: boolean;
    error: AxiosError<AxiosErrorResponseType>;
    mutate: KeyedMutator<T>;
};
export type BaseOptionType<T> = {
	value: T
	label: string
}
export type MailServicesType = 'mailru' | 'google' | 'yandex'
export type MailIMAPServicesType = 'Mailru' | 'Google' | 'Yandex'
export type SWRFethingKeys = 'getPersonalMails' | 'getCorporateMails' | 'getFolders' | 'getMarks' | 'getBaseMailBoxesCount' | 'getMails'

export type MailBox = {
	email: string,
	photo: string,
	unallowedManagers: string[],
	serviceName: MailIMAPServicesType
}

export type SvgProps = {
	width: string,
	height: string,
	color?: HEX | 'transparent'
	style?: React.CSSProperties
	colorBG?: HEX
	className?: string
	clickHandler?: ((event: React.MouseEvent) => void) | ((event: React.MouseEvent) => Promise<void>)
}
