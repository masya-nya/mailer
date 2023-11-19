import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/DTO/create-user.dto';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { PASSWORD_HASH_SALT } from './auth.config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private tokenService: TokenService
	) {}

	async registration({ email, password }: CreateUserDTO) {
		const candidate = await this.userService.getUserByEmail(email);
		if (candidate) {
			throw new HttpException(
				'Пользователь с таким email уже существует',
				HttpStatus.BAD_REQUEST
			);
		}
		const hashPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT);
		const user = await this.userService.createUser({ email, password: hashPassword });
		return this.tokenService.generateTokens({ email: user.email, password: user.password });
	}

	async login(userDTO: CreateUserDTO) {
		const user = await this.validateUser(userDTO);
		return this.tokenService.generateTokens({ email: user.email, password: user.password });
	}

	async validateUser({ email, password }: CreateUserDTO) {
		const user = await this.userService.getUserByEmail(email);
		if (!user) {
			throw new HttpException(
				'Некорректный email',
				HttpStatus.UNAUTHORIZED
			);
		}
		const passwordEquals = await bcrypt.compare(password, user.password);
		if (!passwordEquals) {
			throw new HttpException(
				'Некорректный пароль',
				HttpStatus.UNAUTHORIZED
			);
		}
		
		return user;
	}
}
