import { HttpException, HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';

const handleError = (error: unknown) => {
    if (error instanceof HttpException) {
        throw error;
    }
    if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data || error, error?.response.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (error instanceof Error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw new HttpException('Unexpected error', HttpStatus.INTERNAL_SERVER_ERROR);
};

export default handleError;
