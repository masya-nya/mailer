import { HttpException, HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';

const handleError = (error: unknown, message?: string): HttpException => {
    if (error instanceof HttpException) {
        throw error;
    }
    if (message) {
        throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (error instanceof AxiosError) {
        throw new HttpException(
            error?.response?.data || error?.response || error,
            error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
    if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    throw new HttpException('Unexpected error', HttpStatus.INTERNAL_SERVER_ERROR);
};

export default handleError;
