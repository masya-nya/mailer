import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { MailAuthService } from './mail-auth.service';
import { YandexOAuthGuard } from './guard/yandex-oauth.guard';
import { YandexAuthDTO } from './dto/yandex-auth.dto';
import ENDPOINTS from 'src/core/consts/endpoint';
import { Types } from 'mongoose';
const {
	MAIL_AUTH: { BASE, YANDEX },
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
		console.log(user);
		console.log(redirectClientUri);
		console.log('-----------------------------------------------');

		const mailer = await this.mailAuthService.authRedirect(
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
