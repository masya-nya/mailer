import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService){}

	//* /auth/login
	@Post('/login')
	login(@Body() userDTO: CreateUserDTO){
		return this.authService.login(userDTO);
	}

	//* /auth/registration
	@Post('/registration')
	registration(@Body() userDTO: CreateUserDTO){
		return this.authService.registration(userDTO);
	}
}
