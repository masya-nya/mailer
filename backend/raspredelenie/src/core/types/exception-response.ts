import { ValidationErrorType } from '../helpers/create-validation-error';

export type ExceptionResponse = {
    error: string;
    request_id?: number;
    validation_errors?: ValidationErrorType[];
};
