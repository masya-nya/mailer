import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Endpoints } from '../../core/constants/endpoints';
import { AccountInstallDto } from './dto/account-install.dto';
import { AccountDocument } from './account.model';
import { AccountUninstallDto } from './dto/account-uninstall.dto';

@ApiTags('Account')
@Controller(Endpoints.Account.Base)
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @ApiOperation({ summary: 'Установка пользователем виджета' })
    @ApiResponse({ status: HttpStatus.OK })
    @Get(Endpoints.Account.Install)
    public async install(@Query() widgetUserInfo: AccountInstallDto): Promise<AccountDocument | HttpException> {
        return await this.accountService.install(widgetUserInfo);
    }

    @ApiOperation({ summary: 'Удаления пользователем виджета' })
    @ApiResponse({ status: HttpStatus.OK })
    @Get(Endpoints.Account.UnInstall)
    public async unInstall(@Query() widgetUserInfo: AccountUninstallDto): Promise<AccountDocument | HttpException> {
        return await this.accountService.unInstall(widgetUserInfo);
    }

    @ApiOperation({ summary: 'Получение статуса оплаты пользователя' })
    @ApiResponse({ status: HttpStatus.OK })
    @Get(Endpoints.Account.PaidStatus)
    public async paidStatus(@Query() userId: number): Promise<boolean | HttpException> {
        return await this.accountService.paidStatus(userId);
    }
}
