import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
// import { ValidationPipe } from "./pipes/validation.pipe";
// import { useContainer } from "class-validator";

async function start() {
	const PORT = process.env.PORT || 5000;
	const app = await NestFactory.create(AppModule);

	// ? Почему то вызывает ошибки, нужно будет проверить
	// app.useGlobalPipes(new ValidationPipe());

	// ? Разобраться зачем это нужно
	// useContainer(app.select(AppModule), { 
	// 	fallbackOnErrors: true 
	// });

	const config = new DocumentBuilder()
		.setTitle('Mailer back-end')
		.setDescription('Документация REST API')
		.setVersion('1.0.0')
		.addTag('Masya')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/api/docs', app, document);

	await app.listen(PORT, () => console.log('Server started on PORT =>', PORT));
}
start();
