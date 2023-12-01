import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
// import { ValidationPipe } from './core/pipes/validation.pipe';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function start():Promise<void> {
	const PORT = process.env.PORT || 3000;
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe());
	
	await app.listen(PORT, () =>
		console.log(`Application started on PORT - ${PORT}`)
	);
}
start();
