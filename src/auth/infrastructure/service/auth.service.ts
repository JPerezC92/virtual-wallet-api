import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { UserLogin } from '@/Auth/application';
import { AuthPrismaRepository } from '@/Auth/infrastructure/repos';
import * as authSchemas from '@/Auth/infrastructure/schemas';
import { PrismaService } from '@/Database/prisma.service';
import { ExceptionHandler, ExceptionMap } from '@/Shared/infrastructure/errors';
import { UsersPrismaRepository } from '@/Users/infrastructure/repos';

import { AccessTokenCipher } from './AccessTokenCipher.service';
import { BcryptPasswordCipher } from './BcryptPasswordCipher.service';
import { RefreshTokenCipher } from './RefreshTokenCipher.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly bcryptPasswordCipher: BcryptPasswordCipher,
		private readonly accessTokenCipher: AccessTokenCipher,
		private readonly refreshTokenCipher: RefreshTokenCipher,
	) {}
	async login(
		credentials: authSchemas.CredentialsDto,
		ip: Request['ip'],
		exceptionMap: ExceptionMap,
	): Promise<authSchemas.AuthTokenDto> {
		try {
			return await this.prismaService.$transaction(async (db) => {
				return await UserLogin(
					AuthPrismaRepository(db),
					UsersPrismaRepository(db),
					this.bcryptPasswordCipher,
					this.accessTokenCipher,
					this.refreshTokenCipher,
					(data) => authSchemas.authToken.parse(data),
				).execute({ credentials, ip });
			});
		} catch (error) {
			const HttpException = ExceptionHandler(exceptionMap).find(error);
			throw HttpException();
		}
	}
}
