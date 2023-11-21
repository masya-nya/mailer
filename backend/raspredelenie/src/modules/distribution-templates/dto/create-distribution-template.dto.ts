import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsString, IsNotEmpty, IsBoolean, ValidateIf, ArrayNotEmpty, ArrayMinSize, ValidateNested, IsIn } from 'class-validator';
import { RedistributeTimeSettings } from '../types/redistribute-time-settings';
import { WorkSettings } from '../../../core/types/work-settings';
import { DistributionUserSettings } from '../types/distribution-settings';
import { AllDistributionTypes, DistributionTypesType } from 'src/core/constants/distribution-types';
import { IsCorrectDistributionSettings } from 'src/core/decorators/distribution-settings-validation.decorator';
import { REPEAT_ENTITIES, RepeatEntityType } from 'src/core/types/repeat-sales-entity.type';

export class CreateDistributionTemplateDto {
    @ApiProperty({ example: 'test template', description: 'Distribution template name' })
    @IsNotEmpty({ message: 'Need template name' })
    @IsString({ message: 'Template name should be a string' })
    public name!: string;

    @ApiProperty({
        example: [
            { user: '652e3d40f588aef32c20ee05', weight: 2 },
            { user: '652e3d40f588aef32c20ee07', weight: 3 },
        ],
        description: 'Array of users mongo ids',
    })
    @IsNotEmpty()
    @IsArray({ message: 'Users should be an array of mongoId strings' })
    @ArrayNotEmpty()
    @ArrayMinSize(2, { message: 'Need at least 2 users' })
    @ValidateNested({ each: true })
    @Type(() => DistributionUserSettings)
    public distributionSettings!: DistributionUserSettings[];

    @ApiProperty({ example: 'queue', description: 'distributionType' })
    @IsNotEmpty()
    @IsString()
    @IsIn(AllDistributionTypes)
    @IsCorrectDistributionSettings()
    public distributionType!: DistributionTypesType;

    @ApiProperty({ example: false, description: 'isChangeContactResponsible' })
    @IsNotEmpty()
    @IsBoolean()
    public isChangeContactResponsible!: boolean;

    @ApiProperty({ example: false, description: 'isChangeCompanyResponsible' })
    @IsNotEmpty()
    @IsBoolean()
    public isChangeCompanyResponsible!: boolean;

    @ApiProperty({ example: false, description: 'isChangeLeadTasksResponsible' })
    @IsNotEmpty()
    @IsBoolean()
    public isChangeLeadTasksResponsible!: boolean;

    @ApiProperty({ example: false, description: 'isChangeContactTasksResponsible' })
    @IsNotEmpty()
    @IsBoolean()
    public isChangeContactTasksResponsible!: boolean;

    @ApiProperty({ example: false, description: 'isConsiderIndividualWorkTime' })
    @IsNotEmpty()
    @IsBoolean()
    public isConsiderIndividualWorkTime!: boolean;

    @ApiProperty({ example: null, description: 'isControlRepeatSales' })
    @Transform(({ value }) => (value ? value : null))
    @ValidateIf((_, value) => value !== null)
    @IsIn(REPEAT_ENTITIES)
    public isControlRepeatSales!: RepeatEntityType | null;

    @ApiProperty({ example: null, description: 'redistributeByTimeSettings' })
    @Transform(({ value }) => (value ? value : null))
    @ValidateIf((_, value) => value !== null)
    @ValidateNested()
    @Type(() => RedistributeTimeSettings)
    public redistributeByTimeSettings!: RedistributeTimeSettings | null;

    @ApiProperty({ example: null, description: 'workTime' })
    @Transform(({ value }) => (value ? value : null))
    @ValidateIf((_, value) => value !== null)
    @ValidateNested()
    @Type(() => WorkSettings)
    public workTime!: WorkSettings | null;
}
