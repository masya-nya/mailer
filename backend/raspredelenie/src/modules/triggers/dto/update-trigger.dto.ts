import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { AllDistributionTypes, DistributionTypesType } from 'src/core/constants/distribution-types';
import { DistributionUserSettings } from 'src/modules/distribution-templates/types/distribution-settings';

export class UpdateTriggerInfo {
    @ApiProperty({ example: '652e3d40f588aef32c20ee03', description: 'Template mongo id' })
    @IsOptional()
    @Transform(({ value }) => (value instanceof Types.ObjectId ? value : new Types.ObjectId(value)))
    public template?: Types.ObjectId;

    @ApiProperty({ example: 'queue', description: 'distributionType' })
    @IsOptional()
    @IsString()
    @IsIn(AllDistributionTypes)
    public distributionType?: DistributionTypesType;

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
}
