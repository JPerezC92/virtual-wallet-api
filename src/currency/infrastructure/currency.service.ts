import { Injectable } from '@nestjs/common';

import { CurrencyFindAll } from '@/Currency/application';
import { CurrencyPrismaRepository } from '@/Currency/infrastructure/repos/currency.prisma.repository';
import { PrismaService } from '@/Database/prisma.service';
import { ExceptionHandler, ExceptionMap } from '@/Shared/infrastructure/errors';

@Injectable()
export class CurrencyService {
	constructor(readonly prismaService: PrismaService) {}

	async findAll(exceptionMap: ExceptionMap = []): Promise<string[]> {
		try {
			return this.prismaService.$transaction((db) =>
				CurrencyFindAll(CurrencyPrismaRepository(db)).execute(),
			);
		} catch (error) {
			const HttpException = ExceptionHandler(exceptionMap).find(error);
			throw HttpException();
		}
	}
}
