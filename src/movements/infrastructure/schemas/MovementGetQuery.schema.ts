import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const MovementGetQuery = extendApi(
	z.object({
		accountId: z.string().uuid(),
		page: z
			.string()
			.optional()
			.default('1')
			.transform((value) => {
				const page = parseInt(value, 10);
				return isNaN(page) ? 1 : page;
			}),
		limit: z
			.string()
			.optional()
			.default('10')
			.transform((value) => {
				const limit = parseInt(value, 10);
				return isNaN(limit) ? 10 : limit;
			}),
	}),
	{ title: 'MovementGetQuery' },
);
export class MovementGetQueryDto extends createZodDto(MovementGetQuery) {}
