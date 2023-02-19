import { CurrencyFindAll } from '@/Currency/application';

const currencyList = () => ['USD', 'EUR', 'GBP'];

const CurrencyMockRepository = () => ({
	findAll: jest.fn(),
});

describe('CurrencyFindAll use case', () => {
	test('should return a list of currencies', async () => {
		const currencyRepository = CurrencyMockRepository();

		currencyRepository.findAll.mockResolvedValue(currencyList);

		const result = await CurrencyFindAll(currencyRepository).execute();

		expect(result).toEqual(currencyList);
	});
});
