import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Email, EmailSchema } from './models/email.model';
import { EmailRepository } from './email.repository';
import { EmailService } from './email.service';
import { Logger } from 'src/core/logger/Logger';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Email.name, schema: EmailSchema }
		]),
	],
	providers: [
		EmailService,
		EmailRepository,
		Logger
	],
	exports: [EmailService]
})
export class EmailModule {}