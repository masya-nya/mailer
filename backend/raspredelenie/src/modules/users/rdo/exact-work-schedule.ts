import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { DefaultDayWorkSchedule } from 'src/core/constants/week-days';
import { DayWorkSchedule } from 'src/core/types/day-work-schedule';

export class ExactWorkSchedule {
    @ApiProperty({ example: '652e3d40f588aef32c20ee03', description: 'Work schedule mongo id' })
    @Expose({ name: '_id' })
    @Type(() => String)
    public id!: string;

    @ApiProperty({ example: -1, description: 'User amo id or -1 if office work schedule' })
    @Expose()
    public user!: number;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'User day schedule' })
    @Expose()
    @Type(() => DayWorkSchedule)
    public Mon!: DayWorkSchedule | null;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'User day schedule' })
    @Expose()
    @Type(() => DayWorkSchedule)
    public Tue!: DayWorkSchedule | null;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'User day schedule' })
    @Expose()
    @Type(() => DayWorkSchedule)
    public Wed!: DayWorkSchedule | null;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'User day schedule' })
    @Expose()
    @Type(() => DayWorkSchedule)
    public Thu!: DayWorkSchedule | null;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'User day schedule' })
    @Expose()
    @Type(() => DayWorkSchedule)
    public Fri!: DayWorkSchedule | null;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'User day schedule' })
    @Expose()
    @Type(() => DayWorkSchedule)
    public Sat!: DayWorkSchedule | null;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'User day schedule' })
    @Expose()
    @Type(() => DayWorkSchedule)
    public Sun!: DayWorkSchedule | null;
}
