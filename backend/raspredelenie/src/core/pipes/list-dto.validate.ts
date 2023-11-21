import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException, ParseArrayPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { createValidationError } from '../helpers/create-validation-error';
import { ExceptionResponse } from '../types/exception-response';

@Injectable()
export class ValidateListDtoPipe extends ParseArrayPipe implements PipeTransform {
    constructor() {
        super();
    }

    public async transform(items: object[], { metatype }: ArgumentMetadata): Promise<object[]> {
        if (Array.isArray(items)) {
            if (!items.length) {
                throw new BadRequestException({ error: 'List of elements is empty' }, 'Validation failed');
            }

            const validationErrorResponse: ExceptionResponse[] = [];

            for (let i = 0; i < items.length; i++) {
                const dto = items[i];
                const dtoInstance = plainToInstance(metatype, dto);
                const errors = await validate(dtoInstance);

                if (errors.length > 0) {
                    const response = {
                        error: 'validation field error',
                        validation_errors: createValidationError(errors),
                    };

                    validationErrorResponse.push(response);
                }
            }

            if (validationErrorResponse.length > 0) {
                throw new BadRequestException({ errors: validationErrorResponse }, 'Validation failed');
            }
        }

        return items;
    }
}
