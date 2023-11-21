import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { RedistributeTimeSettings } from '../types/redistribute-time-settings';
import { WorkSettings } from '../../../core/types/work-settings';
import { ExactDistributionSettingsRdo } from './exact-distribution-template-distribution-settings.rdo';

export class ExactDistributionTemplateRdo {
    @ApiProperty({ example: '6530ea63c317c6699a250eae', description: 'Distribution mongo id' })
    @Expose({ name: '_id' })
    @Type(() => String)
    public id!: string;

    @ApiProperty({ example: 'test template', description: 'Distribution template name' })
    @Expose()
    public name!: string;

    @ApiProperty({ example: 'queue', description: 'distributionType' })
    @Expose()
    public distributionType!: string;

    @ApiProperty({ example: false, description: 'isChangeContactResponsible' })
    @Expose()
    public isChangeContactResponsible!: boolean;

    @ApiProperty({ example: false, description: 'isChangeCompanyResponsible' })
    @Expose()
    public isChangeCompanyResponsible!: boolean;

    @ApiProperty({ example: false, description: 'isChangeLeadTasksResponsible' })
    @Expose()
    public isChangeLeadTasksResponsible!: boolean;

    @ApiProperty({ example: false, description: 'isChangeContactTasksResponsible' })
    @Expose()
    public isChangeContactTasksResponsible!: boolean;

    @ApiProperty({ example: false, description: 'isConsiderIndividualWorkTime' })
    @Expose()
    public isConsiderIndividualWorkTime!: boolean;

    @ApiProperty({ example: false, description: 'isControlRepeatSales' })
    @Expose()
    public isControlRepeatSales!: boolean;

    @ApiProperty({ example: null, description: 'redistributeByTimeSettings' })
    @Type(() => RedistributeTimeSettings)
    @Expose()
    public redistributeByTimeSettings!: RedistributeTimeSettings | null;

    @ApiProperty({ example: null, description: 'workTime' })
    @Type(() => WorkSettings)
    @Expose()
    public workTime: WorkSettings | null;

    @ApiProperty({ example: ['6530f2bb0f410a50a9daba51'], description: 'Array of user ids (mongo id and amo id)' })
    @Expose()
    @Type(() => ExactDistributionSettingsRdo)
    public distributionSettings!: ExactDistributionSettingsRdo[];

    @ApiProperty({ example: '2023-11-03T09:32:04.532+00:00', description: 'createdAt' })
    @Expose()
    public createdAt: string;

    @ApiProperty({ example: '22023-11-03T11:00:14.541+00:00', description: 'updatedAt' })
    @Expose()
    public updatedAt: string;
}
