import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const authToken = extendApi(
	z.object({
		accessToken: z.string(),
		refreshToken: z.string(),
	}),
	{ title: 'Authentication tokens' },
);

export class AuthTokenDto extends createZodDto(authToken) {}
