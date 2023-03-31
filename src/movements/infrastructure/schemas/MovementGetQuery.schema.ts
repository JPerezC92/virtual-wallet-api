import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const MovementGetQuery = extendApi(
	z.object({
		accountId: z.string().uuid(),
		page: z.number().optional().default(1),
		limit: z.number().optional().default(10),
	}),
	{ title: 'MovementGetQuery' },
);
export class MovementGetQueryDto extends createZodDto(MovementGetQuery) {}
