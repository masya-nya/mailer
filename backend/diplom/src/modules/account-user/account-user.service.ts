import { Injectable } from '@nestjs/common';
import { Logger } from 'src/core/logger/Logger';
import { UserService } from '../user/user.service';
import { GetAccountUserDTO } from './DTO/get-account-user.dto';
import { AccountService } from '../account/account.service';
import { RoleService } from '../role/role.service';
import { AccountUserRDO } from './RDO/account-user.rdo';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { EmailService } from '../email/email.service';
import { EmailRDO } from '../email/RDO/email.rdo';

@Injectable()
export class AccountUserService {
	private serviceName = 'AccountUserService';

	constructor(
		private readonly logger: Logger,
		private readonly userService: UserService,
		private readonly accountService: AccountService,
		private readonly roleService: RoleService,
		private readonly emailService: EmailService
	) {}

	async getAccountUser(getAccountUserDTO: GetAccountUserDTO):Promise<AccountUserRDO> {
		const { userId, accountId } = getAccountUserDTO;
		const user = await this.userService.findWithPopulate({ _id: userId });
		const account = await this.accountService.find({ _id: accountId });
		const role = await this.roleService.findByUserIdAndAccountId(userId, accountId);
		const emailsDocuments = await this.emailService.findAll({ accountId });
		const emails = emailsDocuments.map(emailDocument => new EmailRDO(emailDocument));
		if (!user || !account || !role) {
			this.logger.error(`Ошибка сбора данных в ${this.serviceName}`);
			throw ApiError.InternalServerError('Ошибка сбора данных для аккаунта');
		}
		const accountUser = new AccountUserRDO(user, account, role, emails);
		return {...accountUser};
	}
}
