import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';

import {
	AccountRecieverNotFound,
	NotEnoughMoney,
	UserIsntOwnerOfAccount,
} from '@/Accounts/domain';
import { AccountsPrismaRepository } from '@/Accounts/infrastructure/repos';
import { PrismaService } from '@/Database/prisma.service';
import {
	CreatePayment,
	CreateTopup,
	CreateTransference,
} from '@/Movements/application';
import { MovementFindByCriteria } from '@/Movements/application/MovementFindAll';
import {
	AccountNotFound,
	AccountSenderAndRecieverAreEqual,
	MovementType,
} from '@/Movements/domain';
import { MovementModelToEndpoint } from '@/Movements/infrastructure/adapter';
import { MovementsPrismaRepository } from '@/Movements/infrastructure/repos';
import * as movementsSchemas from '@/Movements/infrastructure/schemas';
import { MovementGetResponse } from '@/Movements/infrastructure/schemas';
import { ExceptionHandler, ExceptionMap } from '@/Shared/infrastructure/errors';
import { User } from '@/Users/domain';
import { UserNotFound } from '@/Users/domain/UserNotFound.error';
import { UsersPrismaRepository } from '@/Users/infrastructure/repos';

@Injectable()
export class MovementsService {
	constructor(readonly prismaService: PrismaService) {}

	async createMovement(
		user: User,
		newMovement: movementsSchemas.MovementDto,
		exceptionMap: ExceptionMap = [
			[UserNotFound.name, NotFoundException],
			[NotEnoughMoney.name, ConflictException],
			[AccountSenderAndRecieverAreEqual.name, ConflictException],
			[UserIsntOwnerOfAccount.name, ConflictException],
			[AccountRecieverNotFound.name, NotFoundException],
		],
	): Promise<movementsSchemas.Movement> {
		const _newMovement = newMovement as movementsSchemas.MovementCreate;
		try {
			return await this.prismaService.$transaction(async (db) => {
				if (_newMovement.type === MovementType.TOPUP) {
					return await CreateTopup(
						AccountsPrismaRepository(db),
						MovementsPrismaRepository(db),
						UsersPrismaRepository(db),
						MovementModelToEndpoint,
					).execute({ user, newTopup: _newMovement });
				}

				if (_newMovement.type === MovementType.PAYMENT) {
					return await CreatePayment(
						AccountsPrismaRepository(db),
						MovementsPrismaRepository(db),
						UsersPrismaRepository(db),
						MovementModelToEndpoint,
					).execute({ user, newPayment: _newMovement });
				}

				return await CreateTransference(
					AccountsPrismaRepository(db),
					MovementsPrismaRepository(db),
					UsersPrismaRepository(db),
					MovementModelToEndpoint,
				).execute({ user, newTransference: _newMovement });
			});
		} catch (error) {
			const HttpException = ExceptionHandler(exceptionMap).find(error);

			throw HttpException();
		}
	}

	async findByCriteria(
		user: User,
		movementGetQueryDto: movementsSchemas.MovementGetQueryDto,
		exceptionMap: ExceptionMap = [
			[AccountNotFound.name, NotFoundException],
			[UserNotFound.name, NotFoundException],
		],
	): Promise<movementsSchemas.MovementGetResponseDto> {
		try {
			return await this.prismaService.$transaction(
				async (db) =>
					await MovementFindByCriteria(
						AccountsPrismaRepository(db),
						MovementsPrismaRepository(db),
						UsersPrismaRepository(db),
						(out) => MovementGetResponse.parse(out),
					).execute({
						user,
						accountId: movementGetQueryDto.accountId,
						page: movementGetQueryDto.page,
						limit: movementGetQueryDto.limit,
						operation: movementGetQueryDto.operation,
						concept: movementGetQueryDto.concept,
					}),
			);
		} catch (error) {
			const HttpException = ExceptionHandler(exceptionMap).find(error);

			throw HttpException();
		}
	}
}
