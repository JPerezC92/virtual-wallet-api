import { Injectable } from '@nestjs/common';

import { CurrencyFindAll } from '@/Currencies/application';
import { CurrencyModelListToEndpointList } from '@/Currencies/infrastructure/adapters';
import { CurrenciesPrismaRepository } from '@/Currencies/infrastructure/repos';
import { CurrencyList } from '@/Currencies/infrastructure/schemas';
import { PrismaService } from '@/Database/prisma.service';
import { ExceptionHandler, ExceptionMap } from '@/Shared/infrastructure/errors';

@Injectable()
export class CurrenciesService {
	constructor(readonly prismaService: PrismaService) {}

	async findAll(exceptionMap: ExceptionMap = []): Promise<CurrencyList> {
		try {
			return await this.prismaService.$transaction(
				async (db) =>
					await CurrencyFindAll(
						CurrenciesPrismaRepository(db),
						CurrencyModelListToEndpointList,
					).execute(),
			);
		} catch (error) {
			const HttpException = ExceptionHandler(exceptionMap).find(error);
			throw HttpException();
		}
	}
}
