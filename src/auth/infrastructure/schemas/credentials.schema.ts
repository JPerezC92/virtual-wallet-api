import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const credentials = extendApi(
	z.object({
		email: z.string().email(),
		password: z.string(),
	}),
	{ title: 'Credentials' },
);

export class CredentialsDto extends createZodDto(credentials) {}
