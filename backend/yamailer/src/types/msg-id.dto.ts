import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class MsgId {
    @IsNotEmpty({ message: 'Need mark name' })
    @IsInt({ message: 'Mark name should be a string' })
    msgSeq: number;

    @IsNotEmpty({ message: 'Need mark color' })
    @IsString({ message: 'Mark color should be a string' })
    msgId: string;
}
