import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const authTokenSchema = extendApi(
	z.object({
		accessToken: z.string(),
		refreshToken: z.string(),
	}),
	{ title: 'AuthToken' },
);

export class AuthToken extends createZodDto(authTokenSchema) {}
