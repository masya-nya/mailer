import { Prop } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { timeRegExp } from '../constants/timeRegexp';
import { IsCorrectWorkTime } from '../decorators/work-time-validation.decorator';

export class DayWorkSchedule {
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
