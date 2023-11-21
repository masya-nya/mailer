import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {

	constructor() {}

	async ping():Promise<number> {
		return Date.now();
	}

}