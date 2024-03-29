import { AccountDB } from '@prisma/client';
import { z } from 'zod';

import { Account } from '@/Accounts/domain';

export const AccountDBValidator = z
	.object({
		id: z.string(),
		income: z.number(),
		expense: z.number(),
		userId: z.string(),
		currencyValue: z.string(),
		createdAt: z.date(),
		updatedAt: z.date(),
	})
	.transform((v) => new Account({ ...v, currency: v.currencyValue }));

export function AccountDBToModel(accountDB: AccountDB): Account {
	return AccountDBValidator.parse(accountDB);
}
