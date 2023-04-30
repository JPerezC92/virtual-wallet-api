import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { MovementTypeEnum } from '@/Movements/domain';

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
		operation: z.enum(MovementTypeEnum).default('ALL'),
		concept: z.string().default(''),
	}),
	{ title: 'MovementGetQuery' },
);
export class MovementGetQueryDto extends createZodDto(MovementGetQuery) {}
