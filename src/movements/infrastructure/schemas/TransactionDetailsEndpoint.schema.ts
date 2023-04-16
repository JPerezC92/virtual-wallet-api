import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { AccountEndpoint } from '@/Accounts/infrastructure/schemas';
import { UserDetails } from '@/Users/infrastructure/schemas';

export const TransferenceDetailsEndpoint = extendApi(
	z.object({
		accountDetails: AccountEndpoint.pick({ id: true, currency: true }),
		userDetails: UserDetails,
	}),
	{
		title: 'TransferenceDetails',
	},
);

export class TransferenceDetailsDto extends createZodDto(
	TransferenceDetailsEndpoint,
) {}
