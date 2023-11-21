import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AppModules } from 'src/app/constants/modules.enum';
import { ModelDocument } from 'src/core/types/model-document.type';
import { DistributionUserSettings } from '../distribution-templates/types/distribution-settings';
import { DistributionTypesType } from 'src/core/constants/distribution-types';
import { DistributionTemplateDocument } from '../distribution-templates/distribution-template.model';
import { UserPopulatedWorkSchedule } from '../users/user.model';
import { PopulatedModel } from 'src/core/types/populated.type';
import { AccountDocument } from '../account/account.model';

export type TriggerDocument = ModelDocument<Trigger>;

export type PopulatedDistributionSettings = {
    user: UserPopulatedWorkSchedule;
    weight: number;
};

type PopulatedDistributionTemplate = PopulatedModel<
    DistributionTemplateDocument,
    { distributionSettings: PopulatedDistributionSettings[] }
>;

export type TriggerPopulationType = {
    account: AccountDocument;
    template: PopulatedDistributionTemplate;
    distributionSettings: PopulatedDistributionSettings[];
};

export type TriggerPopulatedTemplateAndSettings = PopulatedModel<TriggerDocument, TriggerPopulationType>;

@Schema({ timestamps: true })
export class Trigger {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: AppModules.Account,
    })
    public account!: Types.ObjectId;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: AppModules.DistributionTemplate,
    })
    public template!: Types.ObjectId;

    @Prop({ required: true })
    public distributionType!: DistributionTypesType;

    @Prop({ required: true })
    public triggerUuid: string;

    @Prop({ required: false, default: [] })
    public distributionSettings!: DistributionUserSettings[];
}

export const TriggerSchema = SchemaFactory.createForClass(Trigger);
