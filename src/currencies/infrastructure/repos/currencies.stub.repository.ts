import { CurrenciesRepository } from '@/Currencies/domain';

export const currencyStub1 = 'USD';
export const currencyStub2 = 'ARS';
export const currencyStub3 = 'EUR';

const currenciesStub = [currencyStub1, currencyStub2, currencyStub3];

export function CurrenciesStubRepository(): CurrenciesRepository {
	return {
		findAll: async () => {
			return currenciesStub;
		},
		findByValue: async (currency) => {
			return currenciesStub.find((c) => c === currency);
		},
		findDefault: async () => {
			return currencyStub1;
		},
	};
}
