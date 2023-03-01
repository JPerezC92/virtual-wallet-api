import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';

import { AccountCreate } from '@/Accounts/application/AccountCreate';
import { AccountAlreadyCreated } from '@/Accounts/domain';
import { AccountModelToEndpoint } from '@/Accounts/infrastructure/adapters';
import { AccountsPrismaRepository } from '@/Accounts/infrastructure/repos';
import * as accountSchemas from '@/Accounts/infrastructure/schemas';
import { CurrencyNotFound } from '@/Currencies/domain';
import { CurrenciesPrismaRepository } from '@/Currencies/infrastructure/repos';
import { PrismaService } from '@/Database/prisma.service';
import { ExceptionHandler, ExceptionMap } from '@/Shared/infrastructure/errors';
import { User } from '@/Users/domain';
import { UserNotFound } from '@/Users/domain/UserNotFound.error';
import { UsersPrismaRepository } from '@/Users/infrastructure/repos';

@Injectable()
export class AccountsService {
	constructor(private prismaService: PrismaService) {}

	async createAccount(
		user: User,
		accountCreateDto: accountSchemas.AccountCreateDto,
		exceptionMap: ExceptionMap = [
			[AccountAlreadyCreated.name, ConflictException],
			[UserNotFound.name, NotFoundException],
			[CurrencyNotFound.name, NotFoundException],
		],
	): Promise<accountSchemas.Account> {
		try {
			return await this.prismaService.$transaction(
				async (db) =>
					await AccountCreate(
						AccountsPrismaRepository(db),
						CurrenciesPrismaRepository(db),
						UsersPrismaRepository(db),
						AccountModelToEndpoint,
					).execute({ user, currency: accountCreateDto.currency }),
			);
		} catch (error) {
			const HttpException = ExceptionHandler(exceptionMap).find(error);
			throw HttpException();
		}
	}
}
