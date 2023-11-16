import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { MailRDO } from 'src/mails/types/mails.rdo';

export class CreateAmoEntityDto {
    @ApiProperty({ example: 39012331, description: 'ID аккаунта amoCRM' })
    @IsNotEmpty({ message: 'Need accountId' })
    @IsInt({ message: 'AccountId should be a number' })
    readonly accountId: number;

    @ApiProperty({ example: 63453245, description: 'Id ответственного' })
    @IsNotEmpty({ message: 'Need responsible user id' })
    @IsInt({ message: 'ResponsibleUser should be a number' })
    readonly responsibleUser: number;

    @ApiProperty({ example: 'true', description: 'Отправлять ли события триггерам в digital pipeline', required: false })
    @IsOptional()
    @IsBoolean({ message: 'Trigger should be a boolean' })
    readonly isTriggerNote?: boolean;

    @ApiProperty({ example: 123167447, description: 'Дата следующей покупки в unix', required: false })
    @IsOptional()
    @IsInt({ message: 'nextDate should be a number' })
    readonly nextDate?: number;

    @ApiProperty({ description: 'Массив писем' })
    @IsNotEmpty({ message: 'Need mails array' })
    @IsArray()
    readonly mails: MailRDO[];
}
