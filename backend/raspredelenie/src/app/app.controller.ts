import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Endpoints } from '../core/constants/endpoints';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiTags('Ping')
    @ApiOperation({ summary: 'Проверка работы приложения' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Get(Endpoints.Runtime.Ping)
    public ping(): string {
        return this.appService.ping();
    }
}
