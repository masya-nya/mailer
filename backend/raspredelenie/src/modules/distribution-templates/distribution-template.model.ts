import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AppModules } from 'src/app/constants/modules.enum';
import { UserDocument } from 'src/modules/users/user.model';
import { RedistributeTimeSettings } from './types/redistribute-time-settings';
import { WorkSettings } from 'src/core/types/work-settings';
import { DistributionUserSettings } from './types/distribution-settings';
import { ModelDocument } from 'src/core/types/model-document.type';
import { DistributionTypesType } from 'src/core/constants/distribution-types';
import { PopulatedModel } from 'src/core/types/populated.type';
import { RepeatEntityType } from 'src/core/types/repeat-sales-entity.type';

export type DistributionTemplateDocument = ModelDocument<DistributionTemplate>;
type PopulatedDistributionSettings = {
    user: UserDocument;
    weight: number;
};
export type DistributionTemplatePopulationType = { distributionSettings: PopulatedDistributionSettings[] };
export type DistributionTemplatePopulatedUsers = PopulatedModel<DistributionTemplateDocument, DistributionTemplatePopulationType>;

@Schema({ timestamps: true })
export class DistributionTemplate {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: AppModules.Account,
    })
    public account!: Types.ObjectId;

    @Prop({ required: true })
    public name!: string;

    @Prop({ required: true })
    public distributionType!: DistributionTypesType;

    @Prop({ required: false, default: [] })
    public distributionSettings!: DistributionUserSettings[];

    @Prop({ required: true })
    public isChangeContactResponsible!: boolean;

    @Prop({ required: true })
    public isChangeCompanyResponsible!: boolean;

    @Prop({ required: true })
    public isChangeLeadTasksResponsible!: boolean;

    @Prop({ required: true })
    public isChangeContactTasksResponsible!: boolean;

    @Prop({ required: true })
    public isConsiderIndividualWorkTime!: boolean;

    @Prop({ required: true })
    public isControlRepeatSales: RepeatEntityType | null;

    @Prop({ required: false, default: null })
    public redistributeByTimeSettings!: RedistributeTimeSettings | null;

    @Prop({ required: false, default: null })
    public workTime: WorkSettings | null;
}

export const DistributionTemplateSchema = SchemaFactory.createForClass(DistributionTemplate);
