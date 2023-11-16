import { Module } from '@nestjs/common';
import { AmoApiModule } from 'src/amo-api/amo-api.module';
import { MarlboroService } from 'src/marlboroLogger/marlboro.service';
import { AmoEntitiesController } from './amo-entities.controller';
import { AmoEntitiesService } from './amo-entities.service';

@Module({
    imports: [AmoApiModule],
    providers: [AmoEntitiesService, MarlboroService],
    controllers: [AmoEntitiesController],
})
export class AmoEntitiesModule {}
