import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const UserDetails = extendApi(
	z.object({
		firstName: z.string().min(1),
		lastName: z.string().min(1),
		email: z.string().min(1).email(),
	}),
	{
		title: 'UserDetails',
		description: 'User details information',
	},
);

export class UserDetailsDto extends createZodDto(UserDetails) {}
