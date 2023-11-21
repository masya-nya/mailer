import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { DayWorkSchedule } from '../types/day-work-schedule';

export function IsCorrectWorkTime(validationOptions?: ValidationOptions): PropertyDecorator {
    return (object: object, propertyName: string): void => {
        const validation = (_: unknown, args: ValidationArguments): boolean => {
            const workTime = args.object as DayWorkSchedule;
            return workTime.dayBeginTime < workTime.dayEndTime;
        };

        registerDecorator({
            name: 'IsCorrectWorkTime',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate: validation,
                defaultMessage: () => 'Day begin time can not be more than day end time',
            },
        });
    };
}
