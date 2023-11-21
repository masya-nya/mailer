import { Prop } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { IsNumber, IsNotEmpty, Min } from 'class-validator';
import { Types } from 'mongoose';

export class DistributionUserSettings {
    @Prop({ required: true })
    @IsNotEmpty()
    @Transform(({ value }) => new Types.ObjectId(value))
    public user: Types.ObjectId;

    @Prop({ required: true })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    public weight: number;
}
