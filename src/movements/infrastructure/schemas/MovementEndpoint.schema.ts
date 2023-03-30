import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { MovementType } from '@/Movements/domain';

const MovementEndpointBase = z.object({
	id: z.string().uuid(),
	amount: z.number(),
	date: z.date(),
	concept: z.string(),
	currency: z.string(),
	accountId: z.string().uuid(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const MovementEndpoint = extendApi(
	z.discriminatedUnion('type', [
		z
			.object({
				type: z.literal(MovementType.TOPUP),
			})
			.merge(MovementEndpointBase),
		z
			.object({
				type: z.literal(MovementType.PAYMENT),
			})
			.merge(MovementEndpointBase),
		z
			.object({
				type: z.literal(MovementType.TRANSFERENCE),
				toAccountId: z.string().uuid(),
			})
			.merge(MovementEndpointBase),
	]),
	{
		title: 'Movement',
		example: [
			{
				type: `${MovementType.TOPUP}|${MovementType.PAYMENT}`,
				amount: 'number',
				date: 'string',
				concept: 'string',
				accountId: 'string',
			},
			{
				type: `${MovementType.TRANSFERENCE}`,
				amount: 'number',
				date: 'string',
				concept: 'string',
				accountId: 'string',
				toAccountId: 'string',
			},
		],
	},
);

export type MovementEndpoint = z.infer<typeof MovementEndpoint>;

export class Movement extends createZodDto(MovementEndpoint) {}
