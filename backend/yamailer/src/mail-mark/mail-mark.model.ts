import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { IsNotEmpty, IsString, IsHexColor } from 'class-validator';

export type UserMailMarkDocument = HydratedDocument<UserMailMark>;
export type MailMarkDocument = MailMark & { _id: ObjectId };

@Schema()
export class MailMark {
    @IsNotEmpty({ message: 'Need mark name' })
    @IsString({ message: 'Mark name should be a string' })
    @Prop({ required: true })
    name: string;

    @IsNotEmpty({ message: 'Need mark color' })
    @IsString({ message: 'Mark color should be a string' })
    @IsHexColor({ message: 'color should be a HEX' })
    @Prop({ required: true })
    color: string;
}

const MailMarkSchema = SchemaFactory.createForClass(MailMark);

@Schema()
export class UserMailMark {
    @Prop({ required: true })
    public email: string;

    @Prop({ type: [MailMarkSchema], default: [] })
    public mailMarks: MailMarkDocument[];
}

export const UserMailMarkSchema = SchemaFactory.createForClass(UserMailMark);
