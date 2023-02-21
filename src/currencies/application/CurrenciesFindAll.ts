import { CurrenciesRepository } from '@/Currencies/domain';
import { UseCase } from '@/Shared/application';

export const CurrencyFindAll: (
	currenciesRepository: CurrenciesRepository,
) => UseCase<Promise<string[]>> = (currenciesRepository) => {
	return {
		execute: () => {
			return currenciesRepository.findAll();
		},
	};
};
