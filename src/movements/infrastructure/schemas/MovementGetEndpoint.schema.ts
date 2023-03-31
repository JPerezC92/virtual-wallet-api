import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { MovementEndpoint } from '@/Movements/infrastructure/schemas/MovementEndpoint.schema';

export const MovementGetResponse = extendApi(
	z.object({
		movementList: z.array(MovementEndpoint),
		pagination: z.object({
			page: z.number(),
			totalPages: z.number(),
			prevPage: z.number().nullable(),
			nextPage: z.number().nullable(),
		}),
	}),
	{
		title: 'MovementGetResponse',
	},
);

export class MovementGetResponseDto extends createZodDto(MovementGetResponse) {}
