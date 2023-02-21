import { CurrenciesRepository } from '@/Currencies/domain';
import { Adapter, UseCase } from '@/Shared/application';

export const CurrencyFindAll: <AdapterReturn>(
	currenciesRepository: CurrenciesRepository,
	outputAdapter: Adapter<string[], AdapterReturn>,
) => UseCase<Promise<AdapterReturn>> = (
	currenciesRepository,
	outputAdapter,
) => {
	return {
		execute: async () => {
			const currencyList = await currenciesRepository.findAll();

			return outputAdapter(currencyList);
		},
	};
};
