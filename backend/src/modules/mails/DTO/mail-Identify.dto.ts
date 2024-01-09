import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class MailIdentifyDTO {
    @IsNotEmpty({ message: 'Need msgSeq name' })
    @IsInt({ message: 'MsgSeq name should be a number' })
    msgSeq: number;

    @IsNotEmpty({ message: 'Need msgId' })
    @IsString({ message: 'MsgId should be a string' })
    msgId: string;
}