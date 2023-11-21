import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Logger } from '../core/logger/logger.service';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService, Logger],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return "SERVER WORKING RIGHT NOW"', () => {
            expect(appController.ping()).toMatch(/SERVER WORKING RIGHT NOW\s.+/gm);
        });
    });
});
