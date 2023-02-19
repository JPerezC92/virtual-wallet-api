export interface CurrencyRepository {
	findAll: () => Promise<string[]>;
}
