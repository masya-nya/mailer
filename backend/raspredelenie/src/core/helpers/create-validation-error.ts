import { ValidationError } from '@nestjs/common';

export type ValidationErrorType = {
    request_id?: number;
    field_name: string;
    message: string;
};

export const IS_NOT_EMPTY_FIELD = 'isNotEmpty';

export function createValidationError(errors: ValidationError[]): ValidationErrorType[] {
    return errors
        .map((error) => {
            if (error.children && error.children.length) {
                return createValidationError(error.children);
            }

            return Object.keys(error.constraints).map((validationRequest) => {
                const message =
                    validationRequest === IS_NOT_EMPTY_FIELD ? `${error.property} required` : error.constraints[validationRequest];

                return {
                    field_name: error.property,
                    message: message,
                };
            });
        })
        .flat();
}
