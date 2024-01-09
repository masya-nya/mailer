import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { UserPopulateRDO } from 'src/modules/user/RDO/user.rdo';

export class UpdateRoleDTO {
	readonly _id: string;

	readonly name: string;

	readonly accountId: string;
	
	readonly rights: string[];

	readonly users: UserPopulateRDO[];
}

export class UpdateRolesDTO {
	readonly roles: UpdateRoleDTO[];

	@Transform(({ value }) => new Types.ObjectId(value))
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	readonly accountId: Types.ObjectId;
}
