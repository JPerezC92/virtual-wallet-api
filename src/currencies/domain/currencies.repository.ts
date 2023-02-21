export interface CurrenciesRepository {
	findAll: () => Promise<string[]>;
	findDefault: () => Promise<string>;
	findByValue: (currency: string) => Promise<string | undefined>;
}
