import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
// import { ValidationPipe } from './core/pipes/validation.pipe';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { Logger } from './core/logger/Logger';

async function start():Promise<void> {
	const PORT = process.env.PORT || 3000;
	const app = await NestFactory.create(AppModule, {
		logger: new Logger()
	});

	app.enableCors({
		credentials: true,
		origin: process.env.CLIENT_URL
	});
	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	
	await app.listen(PORT, () =>
		console.log(`Application started on PORT - ${PORT}`)
	);
}
start();
