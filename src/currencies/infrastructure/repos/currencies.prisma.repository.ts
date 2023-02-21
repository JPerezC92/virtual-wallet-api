import { CurrenciesRepository } from '@/Currencies/domain';
import { Repository } from '@/Shared/infrastructure/repos';

export const CurrenciesPrismaRepository: Repository<CurrenciesRepository> = (
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
		findByValue: async (currency) => {
			const _currency = await db.currency.findUnique({
				where: { value: currency },
			});

			if (!_currency) return;

			return _currency.value;
		},
	};
};
