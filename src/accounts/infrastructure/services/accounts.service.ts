import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';

import {
	AccountCreate,
	AccountFind,
	AccountFindTransferenceDetails,
} from '@/Accounts/application';
import { AccountAlreadyCreated } from '@/Accounts/domain';
import {
	AccountModelToEndpoint,
	TransferenceDetailsModelToEndpoint,
} from '@/Accounts/infrastructure/adapters';
import { AccountsPrismaRepository } from '@/Accounts/infrastructure/repos';
import * as accountSchemas from '@/Accounts/infrastructure/schemas';
import { CurrencyNotFound } from '@/Currencies/domain';
import { CurrenciesPrismaRepository } from '@/Currencies/infrastructure/repos';
import { PrismaService } from '@/Database/prisma.service';
import { AccountNotFound } from '@/Movements/domain';
import * as movementsSchemas from '@/Movements/infrastructure/schemas';
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

	getById(accountId: string, user: User): Promise<accountSchemas.Account> {
		return this.prismaService.$transaction(
			async (db) =>
				await AccountFind(
					AccountsPrismaRepository(db),
					UsersPrismaRepository(db),
					AccountModelToEndpoint,
				).execute({
					accountId,
					userId: user.id,
				}),
		);
	}

	async TransferenceDetails(
		accountId: string,
		exceptionMap: ExceptionMap = [
			[UserNotFound.name, NotFoundException],
			[AccountNotFound.name, NotFoundException],
		],
	): Promise<movementsSchemas.TransferenceDetailsDto> {
		try {
			return await this.prismaService.$transaction(
				async (db) =>
					await AccountFindTransferenceDetails(
						AccountsPrismaRepository(db),
						UsersPrismaRepository(db),
						TransferenceDetailsModelToEndpoint,
					).execute({ accountId }),
			);
		} catch (error) {
			const HttpException = ExceptionHandler(exceptionMap).find(error);

			throw HttpException();
		}
	}
}
