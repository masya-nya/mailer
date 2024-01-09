import { Types } from 'mongoose';
import MailsInfo from 'src/core/consts/mailsinfo';

export class CreateEmailDTO {
	serviceName: (typeof MailsInfo)[keyof typeof MailsInfo]['Service'];

	accountId: Types.ObjectId;

	email: string;

	photo: string;

	emailUserId: string;

	accessToken: string;

	refreshToken?: string;
}