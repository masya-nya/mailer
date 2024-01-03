import { EmailDocument } from 'src/modules/email/models/email.model';

export class EmailRDO {
	readonly serviceName: string;
	
	readonly accountId: string;
	
	readonly email: string;
	
	readonly photo: string;

	constructor(email: EmailDocument) {
		this.serviceName = email.serviceName;
		this.accountId = email.accountId.toString();
		this.email = email.email;
		this.photo = email.photo;
	}
}