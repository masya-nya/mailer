import { UserDocument } from '../user.model';

export class UserRDO {
	readonly id:string;

	readonly email:string;
	
	readonly isActivate:boolean;

	readonly isBanned:boolean;

	constructor(userDTO: UserDocument) {
		this.id = userDTO._id.toString();
		this.email = userDTO.email;
		this.isActivate = userDTO.isActivate;
		this.isBanned = userDTO.banned;
	}
}