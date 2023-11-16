import { Controller, Get, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountInstallDto } from './dto/account-install.dto';
import { Endpoints } from '../consts/endpoints';
import { AccountUninstallDto } from './dto/account-uninstall.dto';
import { HttpStatusCode } from 'axios';

@ApiTags('Работа с пользователем виджета')
@Controller()
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @ApiOperation({ summary: 'Установка пользователем виджета' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Get(Endpoints.WidgetUser.Install)
    public async install(@Query() widgetAccountInfo: AccountInstallDto) {
        return await this.accountService.install(widgetAccountInfo);
    }

    @ApiOperation({ summary: 'Удаления пользователем виджета' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Get(Endpoints.WidgetUser.UnInstall)
    public async unInstall(@Query() widgetAccountInfo: AccountUninstallDto) {
        return await this.accountService.unInstall(widgetAccountInfo);
    }
}
