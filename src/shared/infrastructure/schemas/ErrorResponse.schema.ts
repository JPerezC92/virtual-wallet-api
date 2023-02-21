import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const ErrorResponse = extendApi(
	z.object({
		statusCode: z.number().describe('number'),
		message: z.string(),
		code: z.string(),
	}),
	{
		title: 'ErrorResponse',
		description: 'Error response',
		example: {
			statusCode: 'number',
			message: 'string',
			code: 'string',
		},
	},
);

export class ErrorResponseDto extends createZodDto(ErrorResponse) {}
