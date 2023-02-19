export interface CurrencyRepository {
	findAll: () => Promise<string[]>;
	findDefault: () => Promise<string>;
}
