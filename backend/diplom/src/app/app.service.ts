import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const Decorator = (
	target: object,
	name: string,
	descriptor: PropertyDescriptor
):void => {
	console.log(target, name, descriptor);
};

@Injectable()
export class AppService {

	constructor(
		private readonly configService: ConfigService
	) {}

	@Decorator
	async ping():Promise<number> {
		return Date.now();
	}

}