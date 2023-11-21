import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsString,
    IsOptional,
    ValidateIf,
    ArrayNotEmpty,
    IsNotEmpty,
    ArrayMinSize,
    ValidateNested,
    IsIn,
} from 'class-validator';
import { Types } from 'mongoose';
import { RedistributeTimeSettings } from '../types/redistribute-time-settings';
import { WorkSettings } from '../../../core/types/work-settings';
import { DistributionUserSettings } from '../types/distribution-settings';
import { AllDistributionTypes, DistributionTypesType } from 'src/core/constants/distribution-types';
import { IsCorrectDistributionSettings } from 'src/core/decorators/distribution-settings-validation.decorator';
import { REPEAT_ENTITIES, RepeatEntityType } from 'src/core/types/repeat-sales-entity.type';

export class UpdateDistributionTemplateDto {
    @ApiProperty({ example: '652e3d40f588aef32c20ee03', description: 'User mongo id' })
    @IsNotEmpty()
    @Transform(({ value }) => new Types.ObjectId(value))
    public id: string;

    @ApiProperty({ example: 'test template', description: 'Distribution template name' })
    @IsOptional()
    @IsString({ message: 'Template name should be a string' })
    public name?: string;

    @ApiProperty({
        example: [
            { user: '652e3d40f588aef32c20ee05', weight: 2 },
            { user: '652e3d40f588aef32c20ee07', weight: 3 },
        ],
        description: 'Array of users mongo ids',
    })
    @IsOptional()
    @IsArray({ message: 'Users should be an array of mongoId strings' })
    @ArrayNotEmpty()
    @ArrayMinSize(2, { message: 'Need at least 2 users' })
    @ValidateNested({ each: true })
    @Type(() => DistributionUserSettings)
    public distributionSettings?: DistributionUserSettings[];

    @ApiProperty({ example: 'queue', description: 'distributionType' })
    @IsOptional()
    @IsString()
    @IsIn(AllDistributionTypes)
    @IsCorrectDistributionSettings()
    public distributionType?: DistributionTypesType;

    @ApiProperty({ example: false, description: 'isChangeContactResponsible' })
    @IsOptional()
    @IsBoolean()
    public isChangeContactResponsible?: boolean;

    @ApiProperty({ example: false, description: 'isChangeCompanyResponsible' })
    @IsOptional()
    @IsBoolean()
    public isChangeCompanyResponsible?: boolean;

    @ApiProperty({ example: false, description: 'isChangeLeadTasksResponsible' })
    @IsOptional()
    @IsBoolean()
    public isChangeLeadTasksResponsible?: boolean;

    @ApiProperty({ example: false, description: 'isChangeContactTasksResponsible' })
    @IsOptional()
    @IsBoolean()
    public isChangeContactTasksResponsible?: boolean;

    @ApiProperty({ example: false, description: 'isConsiderIndividualWorkTime' })
    @IsOptional()
    @IsBoolean()
    public isConsiderIndividualWorkTime?: boolean;

    @ApiProperty({ example: null, description: 'isControlRepeatSales' })
    @Transform(({ value }) => (value ? value : null))
    @ValidateIf((_, value) => value !== null)
    @IsIn(REPEAT_ENTITIES)
    public isControlRepeatSales?: RepeatEntityType | null;

    @Transform(({ value }) => (value ? value : null))
    @ValidateIf((_, value) => value !== null)
    @ValidateNested()
    @Type(() => RedistributeTimeSettings)
    @ApiProperty({ example: null, description: 'redistributeByTimeSettings' })
    public redistributeByTimeSettings?: RedistributeTimeSettings | null;

    @Transform(({ value }) => (value ? value : null))
    @ValidateIf((_, value) => value !== null)
    @ValidateNested()
    @Type(() => WorkSettings)
    public workTime?: WorkSettings | null;
}
