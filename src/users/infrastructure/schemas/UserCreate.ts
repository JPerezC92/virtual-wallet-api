import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const UserCreate = extendApi(
	z.object({
		firstName: z.string().min(1),
		lastName: z.string().min(1),
		email: z.string().min(1).email(),
		password: z.string().min(1),
	}),
	{
		title: 'UserCreate',
		description: 'A new user',
	},
);

export class UserCreateDto extends createZodDto(UserCreate) {}
