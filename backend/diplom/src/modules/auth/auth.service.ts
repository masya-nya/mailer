import { Injectable } from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { CreateUserDTO } from '../user/DTO/create-user.dto';
import { UserService } from '../user/user.service';
import { PopulatedUser } from '../user/models/user.model';
import { GenerateTokensT } from '../token/types/generate-tokens.type';
import { UserRDO } from '../user/RDO/user.rdo';
import * as bcrypt from 'bcrypt';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { Logger } from 'src/core/logger/Logger';
import { PASSWORD_HASH_SALT } from './config';
import { JwtCreateDTO } from '../token/DTO/jwt-create.dto';
import { LoginDTO } from './DTO/login.dto';

@Injectable()
export class AuthService {
	serviceName: string = 'AuthService';

	constructor(
		private userService: UserService,
		private tokenService: TokenService,
		private logger: Logger
	) {}

	async registration(createUserDTO: CreateUserDTO): Promise<GenerateTokensT & { user: UserRDO }> {
		const { email, name, password } = createUserDTO;
		const candidate = await this.userService.findUserByEmail(email);
		if (candidate) {
			this.logger.error(
				`${this.serviceName}: Попытка регистрации с уже существующим email ${email}`
			);
			throw ApiError.BadRequest(
				`Пользователь с таким email уже существует`
			);
		}
		const hashPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT);
		const user = await this.userService.createUser({
			name,
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
		loginDTO: LoginDTO
	): Promise<GenerateTokensT & { user: UserRDO }> {
		const user = await this.validateUser(loginDTO);
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

	async logout(refreshToken: string): Promise<JwtCreateDTO> {
		try {
			await this.tokenService.removeToken(refreshToken);
			const payload = await this.tokenService.validateRefreshToken(refreshToken);
			return payload;
		} catch (e) {
			this.logger.error(`${this.serviceName}: Неизвестная ошибка в процессе logout'а`);
			throw ApiError.InternalServerError(e.message);
		}
	}

	async refresh(
		refreshToken: string
	): Promise<GenerateTokensT & { user: UserRDO }> {
		console.log('refreshToken', refreshToken);
		if (!refreshToken) {
			this.logger.error(`${this.serviceName}: refreshToken отсутствует`);
			throw ApiError.Unauthorized();
		}
		const jwtPayload = await this.tokenService.validateRefreshToken(refreshToken);
		const tokenFromDB = await this.tokenService.findByToken(refreshToken);
		if (!jwtPayload || !tokenFromDB) {
			console.log(jwtPayload);
			console.log(tokenFromDB);
			this.logger.error(`${this.serviceName}: Ошибка обновления токенов`);
			throw ApiError.Unauthorized();
		}
		const user = await this.userService.findUserByEmailWithPopulate(jwtPayload.email);
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

	async validateUser(loginDTO: LoginDTO): Promise<PopulatedUser> {
		const { email, password } = loginDTO;
		const user = await this.userService.findUserByEmailWithPopulate(email);
		if (!user) {
			this.logger.error(
				`${this.serviceName}: Ошибка валидации, пользователь с таким email уже существует (${email})`
			);
			throw ApiError.BadRequest(
				`Введены неверные данные`
			);
		}
		const passwordEquals = await bcrypt.compare(password, user.password);
		if (!passwordEquals) {
			this.logger.error(
				`${this.serviceName}: Ошибка валидации, неверный пароль для ${email} (${password})`
			);
			throw ApiError.BadRequest(
				`Введены неверные данные`
			);
		}

		return user;
	}
}
