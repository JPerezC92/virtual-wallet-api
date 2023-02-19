import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const InternalServerErrorSchema = extendApi(
	z.object({
		statusCode: z.number().default(500),
		message: z.string(),
	}),
	{ title: 'InternalServerError', description: 'Internal Server Error' },
);

export class InternalServerError extends createZodDto(
	InternalServerErrorSchema,
) {}
