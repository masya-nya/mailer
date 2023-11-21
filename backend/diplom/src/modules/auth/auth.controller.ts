import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/DTO/create-user.dto';
import { GenerateTokensT } from '../token/types/generate-tokens.type';
import { ENDPOINTS } from 'src/core/consts/endpoint';

@Controller(ENDPOINTS.AUTH.BASE)
export class AuthController {

	constructor(
		private authService: AuthService
	) {}

	@Post(ENDPOINTS.AUTH.LOGIN)
	login(@Body() registrationDTO: CreateUserDTO ):Promise<GenerateTokensT> {
		return this.authService.login(registrationDTO);
	}

	@Post(ENDPOINTS.AUTH.REGISTRATION)
	registration(@Body() registrationDTO: CreateUserDTO ):Promise<GenerateTokensT> {
		return this.authService.registration(registrationDTO);
	}
}
