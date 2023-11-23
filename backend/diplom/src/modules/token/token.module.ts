import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './token.model';
import { TokenRepository } from './token.repository';

@Module({
	providers: [TokenService, TokenRepository],
	imports: [
		JwtModule.register({}),
		MongooseModule.forFeature([
			{ name: Token.name, schema: TokenSchema }
		]),
	],
	exports: [
		TokenService
	]
})
export class TokenModule {}
