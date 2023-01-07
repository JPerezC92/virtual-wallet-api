import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import {
	AccessTokenCipher,
	BcryptPasswordCipher,
} from '@/Auth/infrastructure/service';
import { PrismaService } from '@/Database/prisma.service';
import { AppService } from '@/src/app.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [
		JwtModule.register({ secret: '123', signOptions: { expiresIn: '60s' } }),
	],
	exports: [BcryptPasswordCipher],
	controllers: [AuthController],
	providers: [
		AuthService,
		BcryptPasswordCipher,
		AccessTokenCipher,
		AppService,
		PrismaService,
	],
})
export class AuthModule {}
