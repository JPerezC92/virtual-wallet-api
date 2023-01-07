import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { UserCreate } from './UserCreate';

export const UserEndpoint = extendApi(
	UserCreate.omit({ password: true }).merge(
		z.object({
			id: z.string().min(1),
			updatedAt: z.date(),
			createdAt: z.date(),
		}),
	),
	{ title: 'User', description: 'User registered' },
);

export type UserEndpoint = z.infer<typeof UserEndpoint>;

export class User extends createZodDto(UserEndpoint) {}
