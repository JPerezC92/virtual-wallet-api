import {
	CurrencyEndpointList,
	CurrencyList,
} from '@/Currencies/infrastructure/schemas';

export function CurrencyModelListToEndpointList(
	currencyList: string[],
): CurrencyList {
	return CurrencyEndpointList.parse(currencyList);
}
