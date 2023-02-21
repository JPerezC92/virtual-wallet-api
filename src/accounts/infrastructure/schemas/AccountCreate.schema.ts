import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const AccountCreate = extendApi(
	z.object({
		currency: z.string().min(3),
	}),
	{ title: 'AccountCreate', description: 'Create a new account' },
);

export class AccountCreateDto extends createZodDto(AccountCreate) {}
