import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
import { UpdateDistributionTemplateDto } from 'src/modules/distribution-templates/dto/update-distribution-template.dto';
import { DistributionTypes } from '../constants/distribution-types';

const MAX_PERCENTS = 100;

export function IsCorrectDistributionSettings(validationOptions?: ValidationOptions): PropertyDecorator {
    return (object: object, propertyName: string): void => {
        const validation = (_: unknown, args: ValidationArguments): boolean => {
            const template = args.object as UpdateDistributionTemplateDto;
            if (!template.distributionType && !template.distributionSettings) {
                return true;
            }

            const isQueueDistributionType = template.distributionType === DistributionTypes.Queue;
            if (!isQueueDistributionType && (template.redistributeByTimeSettings || template.isConsiderIndividualWorkTime)) {
                return false;
            }

            if (template.distributionType && template.distributionSettings && template.distributionSettings.length > 1) {
                switch (template.distributionType) {
                    case DistributionTypes.Percent:
                        for (const settings of template.distributionSettings) {
                            if (settings.weight <= 0) {
                                return false;
                            }
                        }
                        const sum = template.distributionSettings.reduce(
                            (sumPercent, setting) => Number((sumPercent + setting.weight).toFixed(2)),
                            0
                        );
                        return sum === MAX_PERCENTS;
                    case DistributionTypes.Quantity:
                        for (const settings of template.distributionSettings) {
                            if (settings.weight <= 0) {
                                return false;
                            }
                        }
                        return true;
                    default:
                        return true;
                }
            }

            return false;
        };

        registerDecorator({
            name: 'IsCorrectDistributionSettings',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate: validation,
                defaultMessage: () => 'Invalid distribution settings or/and distribution type',
            },
        });
    };
}
