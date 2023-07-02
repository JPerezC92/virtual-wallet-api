import {
	Injectable,
	NotFoundException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { Request } from 'express';

import {
	RevalidateAccess,
	UpdatePassword,
	UserLogin,
} from '@/Auth/application';
import { Logout } from '@/Auth/application/Logout';
import {
	AuthToken,
	IncorrectOldPassword,
	InvalidCredentials,
} from '@/Auth/domain';
import { AuthPrismaRepository } from '@/Auth/infrastructure/repos';
import * as authSchemas from '@/Auth/infrastructure/schemas';
import { PrismaService } from '@/Database/prisma.service';
import { ExceptionHandler, ExceptionMap } from '@/Shared/infrastructure/errors';
import { User, UserNotFound } from '@/Users/domain';
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
		exceptionMap: ExceptionMap = [
			[InvalidCredentials.name, UnprocessableEntityException],
		],
	): Promise<authSchemas.AuthToken> {
		try {
			return await this.prismaService.$transaction(async (db) => {
				return await UserLogin(
					AuthPrismaRepository(db),
					UsersPrismaRepository(db),
					this.bcryptPasswordCipher,
					this.accessTokenCipher,
					this.refreshTokenCipher,
					(data) => authSchemas.authTokenSchema.parse(data),
				).execute({ credentials, ip });
			});
		} catch (error) {
			const HttpException = ExceptionHandler(exceptionMap).find(error);
			throw HttpException();
		}
	}

	async refreshToken(
		user: User,
		ip: string,
		exceptionMap: ExceptionMap = [],
	): Promise<AuthToken> {
		try {
			return await this.prismaService.$transaction(
				async (db) =>
					await RevalidateAccess(
						AuthPrismaRepository(db),
						this.accessTokenCipher,
						this.refreshTokenCipher,
					).execute({ ip, user }),
			);
		} catch (error) {
			const HttpException = ExceptionHandler(exceptionMap).find(error);
			throw HttpException();
		}
	}

	async logout(
		user: User,
		ip: string,
		exceptionMap: ExceptionMap = [[UserNotFound.name, NotFoundException]],
	): Promise<void> {
		try {
			await this.prismaService.$transaction(
				async (db) =>
					await Logout(
						AuthPrismaRepository(db),
						UsersPrismaRepository(db),
					).execute({
						ip,
						userId: user.id,
					}),
			);
		} catch (error) {
			const HttpException = ExceptionHandler(exceptionMap).find(error);
			throw HttpException();
		}
	}

	async updatePassword(
		user: User,
		updatePasswordDto: authSchemas.ChangeCredentialsDto,
		exceptionMap: ExceptionMap = [
			[IncorrectOldPassword.name, UnprocessableEntityException],
			[UserNotFound.name, NotFoundException],
		],
	): Promise<void> {
		try {
			return await this.prismaService.$transaction(
				async (db) =>
					await UpdatePassword(
						UsersPrismaRepository(db),
						this.bcryptPasswordCipher,
					).execute({
						id: user.id,
						password: updatePasswordDto.password,
						newPassword: updatePasswordDto.newPassword,
					}),
			);
		} catch (error) {
			const HttpException = ExceptionHandler(exceptionMap).find(error);
			throw HttpException();
		}
	}
}
