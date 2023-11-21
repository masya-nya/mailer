import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PASSWORD_HASH_SALT } from './auth.config';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';
import { CreateUserDTO } from '../user/DTO/create-user.dto';
import { UserService } from '../user/user.service';
import { UserDocument } from '../user/user.model';
import { GenerateTokensT } from '../token/types/generate-tokens.type';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private tokenService: TokenService
	) {}

	async registration({ email, password }: CreateUserDTO):Promise<GenerateTokensT> {
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

	async login(userDTO: CreateUserDTO):Promise<GenerateTokensT> {
		const user = await this.validateUser(userDTO);
		return this.tokenService.generateTokens({ email: user.email, password: user.password });
	}

	async validateUser({ email, password }: CreateUserDTO):Promise<UserDocument> {
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
