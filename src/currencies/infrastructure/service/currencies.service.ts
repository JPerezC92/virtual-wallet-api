import { Injectable } from '@nestjs/common';

import { CurrencyFindAll } from '@/Currencies/application';
import { CurrenciesPrismaRepository } from '@/Currencies/infrastructure/repos';
import { PrismaService } from '@/Database/prisma.service';
import { ExceptionHandler, ExceptionMap } from '@/Shared/infrastructure/errors';

@Injectable()
export class CurrenciesService {
	constructor(readonly prismaService: PrismaService) {}

	async findAll(exceptionMap: ExceptionMap = []): Promise<string[]> {
		try {
			return this.prismaService.$transaction((db) =>
				CurrencyFindAll(CurrenciesPrismaRepository(db)).execute(),
			);
		} catch (error) {
			const HttpException = ExceptionHandler(exceptionMap).find(error);
			throw HttpException();
		}
	}
}
