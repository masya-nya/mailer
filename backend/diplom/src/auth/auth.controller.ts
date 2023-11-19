import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/DTO/create-user.dto';

@Controller('auth')
export class AuthController {

	constructor(
		private authService: AuthService
	) {}

	@Post('/login')
	login(@Body() registrationDTO: CreateUserDTO ) {
		return this.authService.login(registrationDTO);
	}

	@Post('/registration')
	registration(@Body() registrationDTO: CreateUserDTO ) {
		return this.authService.registration(registrationDTO);
	}
}
