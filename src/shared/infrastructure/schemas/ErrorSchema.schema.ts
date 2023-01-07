import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const ErrorSchema = extendApi(
	z.object({
		statusCode: z.number(),
		message: z.string(),
		code: z.string(),
	}),
	{ title: 'Error', description: 'Error response' },
);

export class Error extends createZodDto(ErrorSchema) {}
