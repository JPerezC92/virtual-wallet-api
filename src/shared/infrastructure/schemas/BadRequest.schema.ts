import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const BadRequestSchema = extendApi(
	z.object({
		statusCode: z.number().default(400),
		message: z.array(z.string()).optional(),
		error: z.string(),
	}),
	{ title: 'BadRequest', description: 'Bad request response' },
);

export class BadRequest extends createZodDto(BadRequestSchema) {}
