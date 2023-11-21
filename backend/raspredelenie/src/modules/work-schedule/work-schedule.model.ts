import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AppModules } from 'src/app/constants/modules.enum';
import { DefaultDayWorkSchedule } from 'src/core/constants/week-days';
import { DayWorkSchedule } from 'src/core/types/day-work-schedule';
import { ModelDocument } from 'src/core/types/model-document.type';

export type WorkScheduleDocument = ModelDocument<WorkSchedule>;

@Schema({ timestamps: true })
export class WorkSchedule {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: AppModules.Account,
    })
    public account!: Types.ObjectId;

    @Prop({ required: true })
    public user!: number;

    @Prop({ required: false, default: DefaultDayWorkSchedule })
    public Mon!: DayWorkSchedule | null;

    @Prop({ required: false, default: DefaultDayWorkSchedule })
    public Tue!: DayWorkSchedule | null;

    @Prop({ required: false, default: DefaultDayWorkSchedule })
    public Wed!: DayWorkSchedule | null;

    @Prop({ required: false, default: DefaultDayWorkSchedule })
    public Thu!: DayWorkSchedule | null;

    @Prop({ required: false, default: DefaultDayWorkSchedule })
    public Fri!: DayWorkSchedule | null;

    @Prop({ required: false, default: null })
    public Sat!: DayWorkSchedule | null;

    @Prop({ required: false, default: null })
    public Sun!: DayWorkSchedule | null;
}

export const WorkScheduleSchema = SchemaFactory.createForClass(WorkSchedule);
