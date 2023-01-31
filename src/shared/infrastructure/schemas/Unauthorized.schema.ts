import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const UnauthorizedSchema = extendApi(
	z.object({
		statusCode: z.number().default(401),
		message: z.string(),
	}),
	{ title: 'Unauthorized', description: 'Authentication failed' },
);

export class Unauthorized extends createZodDto(UnauthorizedSchema) {}
