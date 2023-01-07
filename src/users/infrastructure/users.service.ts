import { Injectable } from '@nestjs/common';

import { BcryptPasswordCipher } from '@/Auth/infrastructure/service';
import { PrismaService } from '@/Database/prisma.service';
import { ExceptionHandler, ExceptionMap } from '@/Shared/infrastructure/errors';
import { UserRegister } from '@/Users/application';
import { UserModelToEndpoint } from '@/Users/infrastructure/adapters';
import { UsersPrismaRepository } from '@/Users/infrastructure/repos';
import * as usersSchemas from '@/Users/infrastructure/schemas';

@Injectable()
export class UsersService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly bcryptPasswordCipher: BcryptPasswordCipher,
	) {}

	async registerUser(
		createuserDto: usersSchemas.UserCreateDto,
		exceptionMap: ExceptionMap,
	): Promise<usersSchemas.UserEndpoint> {
		try {
			return await this.prismaService.$transaction(async (db) => {
				return await UserRegister(
					UsersPrismaRepository(db),
					this.bcryptPasswordCipher,
					UserModelToEndpoint,
				).execute(createuserDto);
			});
		} catch (error) {
			const HttpException = ExceptionHandler(exceptionMap).find(error);
			throw HttpException();
		}
	}
}
