import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class QueryAccountIdDto {
    @ApiProperty({ example: '31067610', description: 'Account id' })
    @IsNotEmpty({ message: 'Need accountId' })
    @Transform(({ value }) => Number(value))
    @IsInt({ message: 'AccountId should be a number' })
    public accountId!: number;
}
