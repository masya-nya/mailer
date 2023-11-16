import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDTO } from './dto/add-role.dto';
import { BanUserDTO } from './dto/ban-user.dto';

@Injectable()
export class UsersService {

	constructor(
		@InjectModel(User)
		private userRepository: typeof User,
		private roleService: RolesService
	) {}

	async createUser(DTO: CreateUserDTO) {
		const user = await this.userRepository.create(DTO);
		const role = await this.roleService.getRoleByName("USER");
		await user.$set('roles', [role.id]);
		user.roles = [role];
		return user;
	}

	async getAllUser() {
		const users = await this.userRepository.findAll({ include: { all: true } });
		return users;
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({ where: {email}, include: { all: true } });
		return user;
	}

	async addRole(DTO: AddRoleDTO) {
		const user = await this.userRepository.findByPk(DTO.userId);
		const role = await this.roleService.getRoleByName(DTO.role);

		if (user && role) {
			await user.$add('role', role.id);
			return user;
		}

		throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
	}

	async banUser(DTO: BanUserDTO) {
		const user = await this.userRepository.findByPk(DTO.userId);
		if (!user) {
			throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
		}
		user.banned = true;
		user.banReason = DTO.banReason;
		await user.save();
		return user;
	}
}
