import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteTriggerDto {
    @ApiProperty({ example: 214235, description: 'Account id' })
    @IsNotEmpty({ message: 'Need accountId' })
    @IsInt()
    public accountId!: number;

    @ApiProperty({ example: ['28d30ed2-999a-446d-99e8-5b8e98e8317a'], description: 'Array of trigger uuids' })
    @IsNotEmpty({ message: 'Need array of trigger uuids' })
    @IsArray()
    @IsUUID(4, { each: true })
    public triggerUuids!: string[];
}
