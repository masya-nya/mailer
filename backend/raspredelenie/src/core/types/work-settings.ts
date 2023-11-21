import { Prop } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';
import { timeRegExp } from '../constants/timeRegexp';
import { WeekDaysArray } from '../constants/week-days';
import { IsCorrectWorkTime } from '../decorators/work-time-validation.decorator';
import { WeekDayName } from './week-days.type';

export class WorkSettings {
    @Prop({ required: true })
    @Expose()
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsIn(WeekDaysArray, { each: true })
    public days: WeekDayName[];

    @Prop({ required: true })
    @Expose()
    @IsNotEmpty()
    @IsString()
    @Matches(timeRegExp, { message: 'dayBeginTime should be a hh:mm format' })
    @IsCorrectWorkTime()
    public dayBeginTime: string;

    @Prop({ required: true })
    @Expose()
    @IsNotEmpty()
    @IsString()
    @Matches(timeRegExp, { message: 'dayEndTime should be a hh:mm format' })
    public dayEndTime: string;
}
