import { AxiosError } from 'axios';
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