import { CurrencyRepository } from '@/Currency/domain';
import { Repository } from '@/Shared/infrastructure/repos';

export const CurrencyPrismaRepository: Repository<CurrencyRepository> = (
	db,
) => {
	return {
		findAll: async () => {
			const currencyList = await db.currency.findMany();

			return currencyList.map((currency) => currency.value);
		},
		findDefault: async () => {
			const currency = await db.currency.findFirstOrThrow();
			return currency.value;
		},
	};
};
