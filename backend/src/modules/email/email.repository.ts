import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { Logger } from 'src/core/logger/Logger';
import { ModelWithId } from 'src/core/types';
import { Email, EmailDocument } from './models/email.model';
import { CreateEmailDTO } from './DTO/create-email.dto';

@Injectable()
export class EmailRepository {
	readonly serviceName = 'EmailRepository';

	constructor(
		@InjectModel(Email.name) private emailModel: Model<EmailDocument>,
		private readonly logger: Logger
	) {}

	async createEmail(createEmailDTO: CreateEmailDTO): Promise<EmailDocument> {
		try {
			const createdEmail = await this.emailModel.create(createEmailDTO);
			return createdEmail;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async find(findDTO:  Partial<ModelWithId<Email>>): Promise<EmailDocument> {
		try {
			const email = await this.emailModel.findOne({ ...findDTO });
			return email;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async findAll(findDTO:  Partial<ModelWithId<Email>>): Promise<EmailDocument[]> {
		try {
			const email = await this.emailModel.find({ ...findDTO });
			return email;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async updateEmail(findDTO:  Partial<ModelWithId<Email>>, updateDTO: Partial<Email>):Promise<EmailDocument> {
		const updatedEmail = await this.emailModel.findOneAndUpdate(
			{ ...findDTO },
			{ ...updateDTO },
			{ new: true }
		);
		return updatedEmail;
	}
}
