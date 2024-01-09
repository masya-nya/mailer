import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


// function logWithParams():any {
// 	return function(target) {
// 	  return function(...args): any {
// 			console.table(target);
// 			const obj = new target(...args);
// 			obj.test = 'jjjj';
// 			return obj;
// 	  };
// 	};
// }

@Injectable()
// @logWithParams()
export class AppService {

	test: string = '123';

	constructor(
		private readonly configService: ConfigService
	) {
	}
	
	async ping():Promise<string> {
		return this.test;
	}

}