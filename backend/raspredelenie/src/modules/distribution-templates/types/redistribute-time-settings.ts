import { Prop } from '@nestjs/mongoose';
import { Expose, Transform, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, ValidateIf, IsString, Min, Max } from 'class-validator';
import { RedistributionTimeBorders } from 'src/core/constants/redistribution-time-borders';
import { WorkSettings } from 'src/core/types/work-settings';

export class RedistributeTimeSettings {
    @Prop({ required: true })
    @Expose()
    @IsNotEmpty()
    @IsInt()
    @Min(RedistributionTimeBorders.AcceptanceTime.Min)
    @Max(RedistributionTimeBorders.AcceptanceTime.Max)
    public acceptanceTime: number;

    @Prop({ required: true })
    @Expose()
    @IsNotEmpty()
    @IsInt()
    @Min(RedistributionTimeBorders.RedistributionQuantity.Min)
    @Max(RedistributionTimeBorders.RedistributionQuantity.Max)
    public redistributionQuantity: number;

    @Prop({ required: true })
    @Expose()
    @IsNotEmpty()
    @IsString()
    // КОГДА БУДУТ ОПРЕДЕЛЕНЫ НАЗВАНИЯ НАДО БУДЕТ СДЕЛАТЬ МАССИВ ИМЕН И ДОБАВИТЬ ПРОВЕРКУ
    public soundEffect: string;

    @Prop({ required: true })
    @Expose()
    @IsNotEmpty()
    @Transform(({ value }) => (value ? value : null))
    @ValidateIf((_, value) => value !== null)
    @Type(() => WorkSettings)
    public workTimeSettings: WorkSettings | null;
}
