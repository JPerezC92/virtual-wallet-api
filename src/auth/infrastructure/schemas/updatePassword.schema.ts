import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const changeCredentials = extendApi(
	z
		.object({
			password: z.string(),
			newPassword: z.string(),
			confirmNewPassword: z.string(),
		})
		.refine((data) => data.password !== data.newPassword, {
			message: 'New password must be different from old password',
			path: ['newPassword'],
		})
		.refine((data) => data.newPassword === data.confirmNewPassword, {
			message: 'Passwords do not match',
			path: ['confirmNewPassword', 'newPassword'],
		}),

	{ title: 'ChangeCredentials' },
);

export class ChangeCredentialsDto extends createZodDto(changeCredentials) {}
