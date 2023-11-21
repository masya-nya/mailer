import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { UserStatuses } from './constants/statuses.enum';
import { AppModules } from 'src/app/constants/modules.enum';
import { WorkScheduleDocument } from '../work-schedule/work-schedule.model';
import { PopulatedModel } from 'src/core/types/populated.type';
import { ModelDocument } from 'src/core/types/model-document.type';

export type UserDocument = ModelDocument<User>;
export type PopulationWorkScheduleType = { workSchedule: WorkScheduleDocument };
export type UserPopulatedWorkSchedule = PopulatedModel<UserDocument, PopulationWorkScheduleType>;

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: AppModules.Account,
    })
    public account!: Types.ObjectId;

    @Prop({ required: true })
    public accountId!: number;

    @Prop({ required: true })
    public userId!: number;

    @Prop({ required: true })
    public userName!: string;

    @Prop({ required: true, default: true })
    public isInclude!: boolean;

    @Prop({ required: true, default: UserStatuses.On })
    public status!: string;

    @Prop({ required: true })
    public role!: string;

    @Prop()
    public groupId: number | null;

    @Prop({ required: true })
    public group!: string;

    @Prop({ required: true })
    public isActive!: boolean;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: AppModules.WorkSchedule,
    })
    public workSchedule!: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
