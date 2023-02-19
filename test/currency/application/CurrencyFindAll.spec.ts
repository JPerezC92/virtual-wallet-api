import { CurrencyFindAll } from '@/Currency/application';
import { CurrencyMockRepository } from '@/Test/currency/infrastructure/CurrencyMockRepository';

const currencyList = () => ['USD', 'EUR', 'GBP'];

describe('CurrencyFindAll use case', () => {
	test('should return a list of currencies', async () => {
		const currencyRepository = CurrencyMockRepository();

		currencyRepository.findAll.mockResolvedValue(currencyList);

		const result = await CurrencyFindAll(currencyRepository).execute();

		expect(result).toEqual(currencyList);
	});
});
