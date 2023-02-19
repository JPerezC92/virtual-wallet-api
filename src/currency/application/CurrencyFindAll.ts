import { CurrencyRepository } from '@/Currency/domain';
import { UseCase } from '@/Shared/application';

export const CurrencyFindAll: (
	currencyRepository: CurrencyRepository,
) => UseCase<Promise<string[]>> = (currencyRepository) => {
	return {
		execute: () => {
			return currencyRepository.findAll();
		},
	};
};
