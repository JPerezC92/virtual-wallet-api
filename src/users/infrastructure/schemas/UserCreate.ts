import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { UserDetails } from './userDetailsEndpoint';

export const UserCreate = extendApi(
	UserDetails.merge(
		z.object({
			password: z.string().min(1),
		}),
	),
	{
		title: 'UserCreate',
		description: 'A new user',
	},
);

export class UserCreateDto extends createZodDto(UserCreate) {}
