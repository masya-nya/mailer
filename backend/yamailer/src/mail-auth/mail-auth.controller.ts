import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from './guard/google-oauth.guard';
import { MailAuthService } from './mail-auth.service';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { YandexOAuthGuard } from './guard/yandex-oauth.guard';
import { YandexAuthDto } from './dto/yandex-auth.dto';
import { MailruAuthDto } from './dto/mailru-auth.dto';
import { MailruOAuthGuard } from './guard/mailru-oauth.guard';
import { Endpoints } from '../consts/endpoints';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Авторизация в почтовых сервисах')
@Controller(Endpoints.MailAuth.Root)
export class MailAuthController {
    constructor(private readonly mailAuthService: MailAuthService) {}

    @Get(Endpoints.MailAuth.Google.Auth)
    @UseGuards(GoogleOAuthGuard)
    public googleAuth(): void {}

    @Get(Endpoints.MailAuth.Google.Redirect)
    @UseGuards(GoogleOAuthGuard)
    public async googleAuthRedirect(@Req() request, @Res() response): Promise<void> {
        const amoId = request.session['amoid'];
        const managerId = request.session['managerId'];
        const redirectClientUri = request.session['redirectClientUri'];
        const user: GoogleAuthDto = request.user;

        const mailer = await this.mailAuthService.googleAuthRedirect(user, Number(amoId), Number(managerId));
        if (!mailer) {
            return response.status(400).send(this.mailAuthService.usedMailInfo(redirectClientUri));
        }

        return response.redirect(decodeURI(redirectClientUri));
    }

    @Get(Endpoints.MailAuth.Yandex.Auth)
    @UseGuards(YandexOAuthGuard)
    public yandexAuth(): void {}

    @Get(Endpoints.MailAuth.Yandex.Redirect)
    @UseGuards(YandexOAuthGuard)
    public async yandexAuthRedirect(@Req() request, @Res() response): Promise<void> {
        const amoId = request.session['amoid'];
        const managerId = request.session['managerId'];
        const redirectClientUri = request.session['redirectClientUri'];
        const user: YandexAuthDto = request.user;

        const mailer = await this.mailAuthService.yandexAuthRedirect(user, Number(amoId), Number(managerId));
        if (!mailer) {
            return response.status(400).send(this.mailAuthService.usedMailInfo(redirectClientUri));
        }

        return response.redirect(decodeURI(redirectClientUri));
    }

    @Get(Endpoints.MailAuth.Mailru.Auth)
    @UseGuards(MailruOAuthGuard)
    public mailruAuth(): void {}

    @Get(Endpoints.MailAuth.Mailru.Redirect)
    @UseGuards(MailruOAuthGuard)
    public async mailruAuthRedirect(@Req() request, @Res() response): Promise<void> {
        const amoId = request.session['amoid'];
        const managerId = request.session['managerId'];
        const redirectClientUri = request.session['redirectClientUri'];
        const user: MailruAuthDto = request.user;

        const mailer = await this.mailAuthService.mailruAuthRedirect(user, Number(amoId), Number(managerId));
        if (!mailer) {
            return response.status(400).send(this.mailAuthService.usedMailInfo(redirectClientUri));
        }

        return response.redirect(decodeURI(redirectClientUri));
    }
}
