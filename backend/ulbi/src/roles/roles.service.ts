import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { CreateRoleDTO } from './dto/create-role.dto';

@Injectable()
export class RolesService {

	constructor(
		@InjectModel(Role) private roleRepository: typeof Role
	){}

	async createRole(DTO: CreateRoleDTO) {
		const role = await this.roleRepository.create(DTO);
		return role;
	}

	async getRoleByName(role: string) {
		const searchedrole = await this.roleRepository.findOne({ where: { role } });
		return searchedrole;
	}

}
