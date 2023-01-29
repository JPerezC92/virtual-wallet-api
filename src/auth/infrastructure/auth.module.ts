import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import {
	AccessTokenCipher,
	BcryptPasswordCipher,
	RefreshTokenCipher,
} from '@/Auth/infrastructure/service';
import { DatabaseModule } from '@/Database/database.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [ConfigModule, JwtModule, DatabaseModule],
	exports: [BcryptPasswordCipher],
	controllers: [AuthController],
	providers: [
		AccessTokenCipher,
		AuthService,
		BcryptPasswordCipher,
		RefreshTokenCipher,
	],
})
export class AuthModule {}
