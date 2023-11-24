import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PASSWORD_HASH_SALT } from './auth.config';
import { TokenService } from '../token/token.service';
import { CreateUserDTO } from '../user/DTO/create-user.dto';
import { UserService } from '../user/user.service';
import { UserDocument } from '../user/user.model';
import { GenerateTokensT } from '../token/types/generate-tokens.type';
import { UserRDO } from '../user/RDO/user.rdo';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private tokenService: TokenService
	) {}

	async registration({
		email,
		password,
	}: CreateUserDTO): Promise<GenerateTokensT & { user: UserRDO }> {
		const candidate = await this.userService.getUserByEmail(email);
		if (candidate) {
			throw new HttpException(
				'Пользователь с таким email уже существует',
				HttpStatus.BAD_REQUEST
			);
		}
		const hashPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT);
		const user = await this.userService.createUser({
			email,
			password: hashPassword,
		});
		const userRDO = new UserRDO(user);
		const tokens = await this.tokenService.generateTokens({
			email: user.email,
			password: user.password,
		});
		await this.tokenService.saveToken({
			userId: user._id,
			refreshToken: tokens.refreshToken,
		});
		return {
			...tokens,
			user: { ...userRDO },
		};
	}

	async login(
		userDTO: CreateUserDTO
	): Promise<GenerateTokensT & { user: UserRDO }> {
		const user = await this.validateUser(userDTO);
		const userRDO = new UserRDO(user);
		const tokens = await this.tokenService.generateTokens({
			email: user.email,
			password: user.password,
		});
		await this.tokenService.saveToken({
			userId: user._id,
			refreshToken: tokens.refreshToken,
		});
		return {
			...tokens,
			user: { ...userRDO },
		};
	}

	async logout(refreshToken: string): Promise<void> {
		await this.tokenService.removeToken(refreshToken);
	}

	async validateUser({
		email,
		password,
	}: CreateUserDTO): Promise<UserDocument> {
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
