import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MarlboroService } from './marlboroLogger/marlboro.service';
import { Endpoints } from './consts/endpoints';
import * as session from 'express-session';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';

const logger = new MarlboroService();
const loggerContext = 'Global App Logger';

async function bootstrap(): Promise<void> {
    const PORT = process.env.PORT || 3000;

    const app = await NestFactory.create(AppModule, {
        logger: new MarlboroService(),
    });

    app.enableCors({ origin: '*' });

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    app.use(
        session({
            secret: process.env.SESSIONS_SECRET_KEY,
            resave: false,
            saveUninitialized: false,
        })
    );

    app.setGlobalPrefix(Endpoints.Global);

    const config = new DocumentBuilder()
        .setTitle('Доработка функционала раздела почта amoCRM от REON')
        .setDescription('Документация')
        .setVersion('1.3.3.7')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(`${Endpoints.Global}/docs`, app, document);

    await app
        .listen(PORT, () => {
            app.get(MarlboroService).debug(`Ahhh shit...Here we go again: SERVER STARTED ON PORT ${PORT}`, 'SERVER');
        })
        .catch((err) => logger.debug(err, loggerContext));
}

try {
    bootstrap();
} catch (error) {
    logger.debug(error, loggerContext);
}
