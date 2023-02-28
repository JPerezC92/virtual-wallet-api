import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const AccountEndpoint = extendApi(
	z.object({
		id: z.string(),
		money: z.number(),
		userId: z.string(),
		currency: z.string(),
		createdAt: z.date(),
		updatedAt: z.date(),
	}),
	{ title: 'Account' },
);

export type AccountEndpoint = z.infer<typeof AccountEndpoint>;

export class Account extends createZodDto(AccountEndpoint) {}
