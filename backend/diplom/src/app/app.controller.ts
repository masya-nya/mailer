import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ENDPOINTS } from 'src/core/consts/endpoint';


@Controller()
export class AppController {
	constructor(
		private appService: AppService
	) {}

	@Get(ENDPOINTS.PING)
	ping():Promise<string> {
		return this.appService.ping();
	}
}