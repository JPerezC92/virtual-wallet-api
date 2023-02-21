import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { CurrencyEndpoint } from './CurrencyEndpoint.schema';

export const CurrencyEndpointList = extendApi(z.array(CurrencyEndpoint), {
	title: 'CurrencyList',
	description: 'List of currencies',
});

export class CurrencyList extends createZodDto(CurrencyEndpointList) {}
