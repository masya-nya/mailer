import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	){}

	async login(userDTO: CreateUserDTO){
		const user = await this.validateUser(userDTO);
		return this.generateToken(user);
	}

	async registration(userDTO: CreateUserDTO){
		const candidate = await this.usersService.getUserByEmail(userDTO.email);
		if (candidate) {
			throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
		}
		const hashPassword = await bcrypt.hash(userDTO.password, 5);
		const user = await this.usersService.createUser({ ...userDTO, password: hashPassword });
		return this.generateToken(user);
	}

	private async generateToken(user: User) {
		const payload = { email: user.email, id: user.id, roles: user.roles };
		return {
			token: this.jwtService.sign(payload)
		};
	}

	private async validateUser(userDTO: CreateUserDTO) {
		const user = await this.usersService.getUserByEmail(userDTO.email);
		const passwordEquals = await bcrypt.compare(userDTO.password, user.password);
		if (user && passwordEquals) {
			return user;
		}
		throw new UnauthorizedException({ message: 'Некорректный email или пароль' });
	}
}
