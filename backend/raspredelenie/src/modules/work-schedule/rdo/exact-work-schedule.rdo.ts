import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { DefaultDayWorkSchedule } from 'src/core/constants/week-days';
import { DayWorkSchedule } from 'src/core/types/day-work-schedule';

export class ExactWorkScheduleRdo {
    @ApiProperty({ example: '6530ea63c317c6699a250eae', description: 'Work schedule mongo id' })
    @Expose({ name: '_id' })
    @Type(() => String)
    public id!: string;

    @ApiProperty({ example: 212357, description: 'User amo id' })
    @Expose()
    public user!: number;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'Day work schedule' })
    @Expose()
    @Type(() => DayWorkSchedule)
    public Mon!: DayWorkSchedule | null;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'Day work schedule' })
    @Expose()
    @Type(() => DayWorkSchedule)
    public Tue!: DayWorkSchedule | null;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'Day work schedule' })
    @Expose()
    @Type(() => DayWorkSchedule)
    public Wed!: DayWorkSchedule | null;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'Day work schedule' })
    @Expose()
    @Type(() => DayWorkSchedule)
    public Thu!: DayWorkSchedule | null;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'Day work schedule' })
    @Expose()
    @Type(() => DayWorkSchedule)
    public Fri!: DayWorkSchedule | null;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'Day work schedule' })
    @Expose()
    @Type(() => DayWorkSchedule)
    public Sat!: DayWorkSchedule | null;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'Day work schedule' })
    @Expose()
    @Type(() => DayWorkSchedule)
    public Sun!: DayWorkSchedule | null;
}
