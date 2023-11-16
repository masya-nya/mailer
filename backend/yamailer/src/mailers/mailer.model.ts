import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsIn, IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';
import { HydratedDocument, ObjectId } from 'mongoose';
import MailsInfo from 'src/consts/mailsInfo';

export type UserMailersDocument = HydratedDocument<UserMailers>;
export type MailerDocument = Mailer & { _id: ObjectId };
export type MailerRdo = Pick<Mailer, 'email' | 'photo' | 'serviceName' | 'unallowedManagers'>;

@Schema()
export class Mailer {
    @IsNotEmpty({ message: 'Need mail service name' })
    @IsString({ message: 'Mail service name should be a string' })
    @IsIn([MailsInfo.Google.Service, MailsInfo.Yandex.Service, MailsInfo.Mailru.Service])
    @Prop({ required: true, type: String })
    serviceName: (typeof MailsInfo)[keyof typeof MailsInfo]['Service'];

    @IsNotEmpty({ message: 'Need email' })
    @IsString({ message: 'Email should be a string' })
    @IsEmail({}, { message: 'Invalid email' })
    @Prop({ required: true })
    email: string;

    @IsNotEmpty({ message: 'Need profile image uri' })
    @IsString({ message: 'Profile image uri should be a string' })
    @Prop({ required: true })
    photo: string;

    @IsNotEmpty({ message: 'Need mail useId' })
    @IsString({ message: 'Mail userId should be a string' })
    @Prop({ required: true })
    mailUserId: string;

    @IsNotEmpty({ message: 'Need accessToken' })
    @IsString({ message: 'AccessToken should be a string' })
    @Prop({ required: true })
    accessToken: string;

    @IsOptional()
    @IsString({ message: 'RefreshToken should be a string' })
    @Prop({ required: false })
    refreshToken?: string;

    @IsOptional()
    @IsArray({ message: 'AllowedManagers should be an array of manager ids' })
    @IsString({ each: true, message: 'ManagerId should be a string' })
    @Prop({ type: [String], required: false, default: null })
    unallowedManagers?: string[];
}

const MailerSchema = SchemaFactory.createForClass(Mailer);

@Schema()
export class UserMailers {
    @Prop({ required: true })
    public accountId: number;

    @Prop({ required: true })
    public managerId: number;

    @Prop({ type: [MailerSchema], default: [] })
    public mailers: MailerDocument[];
}

export const UserMailerSchema = SchemaFactory.createForClass(UserMailers);
