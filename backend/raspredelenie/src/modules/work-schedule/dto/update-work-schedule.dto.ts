import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, ValidateIf, ValidateNested } from 'class-validator';
import { DefaultDayWorkSchedule } from 'src/core/constants/week-days';
import { DayWorkSchedule } from 'src/core/types/day-work-schedule';
import { Types } from 'mongoose';

export class UpdateWorkScheduleDto {
    @ApiProperty({ example: '652e3d40f588aef32c20ee03', description: 'Schedule mongo id' })
    @IsNotEmpty()
    @Transform(({ value }) => (value instanceof Types.ObjectId ? value : new Types.ObjectId(value)))
    public id: Types.ObjectId;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'Monday work schedule' })
    @Transform(({ value }) => (value ? value : null))
    @ValidateIf((_, value) => value !== null)
    @ValidateNested()
    @Type(() => DayWorkSchedule)
    public Mon!: DayWorkSchedule | null;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'Tuesday work schedule' })
    @Transform(({ value }) => (value ? value : null))
    @ValidateIf((_, value) => value !== null)
    @ValidateNested()
    @Type(() => DayWorkSchedule)
    public Tue!: DayWorkSchedule | null;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'Wednesday work schedule' })
    @Transform(({ value }) => (value ? value : null))
    @ValidateIf((_, value) => value !== null)
    @ValidateNested()
    @Type(() => DayWorkSchedule)
    public Wed!: DayWorkSchedule | null;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'Thursday work schedule' })
    @Transform(({ value }) => (value ? value : null))
    @ValidateIf((_, value) => value !== null)
    @ValidateNested()
    @Type(() => DayWorkSchedule)
    public Thu!: DayWorkSchedule | null;

    @ApiProperty({ example: DefaultDayWorkSchedule, description: 'Friday work schedule' })
    @Transform(({ value }) => (value ? value : null))
    @ValidateIf((_, value) => value !== null)
    @ValidateNested()
    @Type(() => DayWorkSchedule)
    public Fri!: DayWorkSchedule | null;

    @ApiProperty({ example: null, description: 'Saturday work schedule' })
    @Transform(({ value }) => (value ? value : null))
    @ValidateIf((_, value) => value !== null)
    @ValidateNested()
    @Type(() => DayWorkSchedule)
    public Sat!: DayWorkSchedule | null;

    @ApiProperty({ example: null, description: 'Sunday work schedule' })
    @Transform(({ value }) => (value ? value : null))
    @ValidateIf((_, value) => value !== null)
    @ValidateNested()
    @Type(() => DayWorkSchedule)
    public Sun!: DayWorkSchedule | null;
}
