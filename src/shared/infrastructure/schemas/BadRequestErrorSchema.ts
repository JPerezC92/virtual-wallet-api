import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const BadRequestSchema = extendApi(
	z.object({
		statusCode: z.number().default(400),
		message: z.array(z.string()),
		error: z.string(),
	}),
	{ title: 'BadRequestErrorSchema', description: 'Bad request response' },
);

export class BadRequest extends createZodDto(BadRequestSchema) {}
