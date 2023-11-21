import { Test, TestingModule } from '@nestjs/testing';
import { AmoApiService } from './amo-api.service';

describe('AmoApiService', () => {
    let service: AmoApiService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AmoApiService],
        }).compile();

        service = module.get<AmoApiService>(AmoApiService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
