import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { MovementEndpoint } from '@/Movements/infrastructure/schemas/MovementEndpoint.schema';

const MovementListGetEndpoint = extendApi(
	z.object({
		accountId: z.string().uuid(),
	}),
	{ title: 'MovementListGetDto' },
);

const MovementListGetRes = extendApi(z.array(MovementEndpoint), {
	title: 'MovementEndpointList',
});

export class MovementGetResponseDto extends createZodDto(MovementListGetRes) {}
export class MovementListGetDto extends createZodDto(MovementListGetEndpoint) {}
