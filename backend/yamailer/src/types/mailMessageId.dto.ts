import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class MailMessageId {
    @ApiProperty({ example: '14', description: 'Порядковый номер пиьсма в папке/разделе почтового сервиса' })
    @IsNotEmpty({ message: 'Need msgSeq name' })
    @IsInt({ message: 'MsgSeq name should be a number' })
    msgSeq: number;

    @ApiProperty({ example: '<sdf667dfg243d22fh23.google.com>', description: 'Уникальный id сообщения' })
    @IsNotEmpty({ message: 'Need msgId' })
    @IsString({ message: 'MsgId should be a string' })
    msgId: string;
}
