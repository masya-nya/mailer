import { Injectable } from '@nestjs/common';
import { PASSWORD_HASH_SALT } from './auth.config';
import { TokenService } from '../token/token.service';
import { CreateUserDTO } from '../user/DTO/create-user.dto';
import { UserService } from '../user/user.service';
import { UserDocument } from '../user/user.model';
import { GenerateTokensT } from '../token/types/generate-tokens.type';
import { UserRDO } from '../user/RDO/user.rdo';
import * as bcrypt from 'bcrypt';
import { ApiError } from 'src/core/exceptions/api-error.exception';

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
			throw ApiError.BadRequest(
				'Пользователь с таким email уже существует'
			);
		}
		const hashPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT);
		const user = await this.userService.createUser({
			email,
			password: hashPassword,
		});
		const tokens = await this.tokenService.generateTokens({
			email: user.email,
			password: user.password,
		});
		await this.tokenService.saveToken({
			userId: user._id,
			refreshToken: tokens.refreshToken,
		});
		const userRDO = new UserRDO(user);
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

	async refresh(
		refreshToken: string
	): Promise<GenerateTokensT & { user: UserRDO }> {
		console.log(1);
		if (!refreshToken) {
			throw ApiError.Unauthorized();
		}
		console.log(2);
		const jwtPayload =
			await this.tokenService.validateRefreshToken(refreshToken);
		console.log(3);
		const tokenFromDB = await this.tokenService.findByToken(refreshToken);
		console.log(jwtPayload);
		console.log(tokenFromDB);
		if (!jwtPayload || !tokenFromDB) {
			throw ApiError.Unauthorized();
		}
		console.log(5);
		const user = await this.userService.getUserByEmail(jwtPayload.email);
		console.log(6);
		const userRDO = new UserRDO(user);
		console.log(7);
		const tokens = await this.tokenService.generateTokens({
			email: user.email,
			password: user.password,
		});
		console.log(8);
		await this.tokenService.saveToken({
			userId: user._id,
			refreshToken: tokens.refreshToken,
		});
		console.log(9);
		return {
			...tokens,
			user: { ...userRDO },
		};
	}

	async validateUser({
		email,
		password,
	}: CreateUserDTO): Promise<UserDocument> {
		const user = await this.userService.getUserByEmail(email);
		if (!user) {
			throw ApiError.BadRequest(
				'Пользователя с таким email не существует'
			);
		}
		const passwordEquals = await bcrypt.compare(password, user.password);
		if (!passwordEquals) {
			throw ApiError.Unauthorized();
		}

		return user;
	}
}
