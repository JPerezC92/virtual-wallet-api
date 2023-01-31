import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@/Auth/infrastructure/auth.controller';
import {
	AccessJwtStrategy,
	AccessTokenCipher,
	AuthService,
	BcryptPasswordCipher,
	RefreshJwtStrategy,
	RefreshTokenCipher,
} from '@/Auth/infrastructure/service';
import { DatabaseModule } from '@/Database/database.module';

@Module({
	imports: [ConfigModule, JwtModule, DatabaseModule],
	exports: [BcryptPasswordCipher],
	controllers: [AuthController],
	providers: [
		AccessJwtStrategy,
		RefreshJwtStrategy,
		AccessTokenCipher,
		AuthService,
		BcryptPasswordCipher,
		RefreshTokenCipher,
	],
})
export class AuthModule {}
