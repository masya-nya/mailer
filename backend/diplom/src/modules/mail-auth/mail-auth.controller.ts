import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { MailAuthService } from './mail-auth.service';
import { YandexOAuthGuard } from './guard/yandex-oauth.guard';
import { YandexAuthDTO } from './dto/yandex-auth.dto';
import ENDPOINTS from 'src/core/consts/endpoint';
import { Types } from 'mongoose';
import { GoogleAuthDTO } from './dto/google-auth.dto';
import { GoogleOAuthGuard } from './guard/google-oauth.guard';
const {
	MAIL_AUTH: { BASE, YANDEX, GOOGLE },
} = ENDPOINTS;

@Controller(BASE)
export class MailAuthController {
	constructor(private readonly mailAuthService: MailAuthService) {}

	@Get(YANDEX.AUTH)
	@UseGuards(YandexOAuthGuard)
	public yandexAuth(): void {}

	@Get(YANDEX.REDIRECT)
	@UseGuards(YandexOAuthGuard)
	public async yandexAuthRedirect(
		@Req() request,
		@Res() response
	): Promise<void> {
		const redirectClientUri = request.session['redirectClientUri'];
		const accountId = new Types.ObjectId(request.session['accountId']);
		const user: YandexAuthDTO = request.user;

		const mailer = await this.mailAuthService.yandexAuthRedirect(
			user,
			accountId
		);
		if (!mailer) {
			return response
				.status(400)
				.send(this.mailAuthService.usedMailInfo(redirectClientUri));
		}

		return response.redirect(decodeURI(redirectClientUri));
	}

	@Get(GOOGLE.AUTH)
	@UseGuards(GoogleOAuthGuard)
	public googleAuth(): void {}

	@Get(GOOGLE.REDIRECT)
	@UseGuards(GoogleOAuthGuard)
	public async googleAuthRedirect(
		@Req() request,
		@Res() response
	): Promise<void> {
		const redirectClientUri = request.session['redirectClientUri'];
		const accountId = new Types.ObjectId(request.session['accountId']);
		const user: GoogleAuthDTO = request.user;

		const mailer = await this.mailAuthService.googleAuthRedirect(
			user,
			accountId
		);
		if (!mailer) {
			return response
				.status(400)
				.send(this.mailAuthService.usedMailInfo(redirectClientUri));
		}

		return response.redirect(decodeURI(redirectClientUri));
	}
}
