import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { MovementType } from '@/Movements/domain';

export const MovementEndpointBase = z.object({
	id: z.string().uuid(),
	amount: z.number(),
	date: z.date(),
	concept: z.string(),
	currency: z.string().min(3).max(3),
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
				isTransferenceReceived: z.boolean(),
				toAccountId: z.string().uuid(),
			})
			.merge(MovementEndpointBase),
	]),
	{
		title: 'Movement',
		example: [
			{
				id: 'string',
				type: `${MovementType.TOPUP}|${MovementType.PAYMENT}`,
				amount: 'number',
				date: new Date(),
				concept: 'string',
				currency: 'ARS',
				accountId: 'string',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 'string',
				type: `${MovementType.TRANSFERENCE}`,
				amount: 'number',
				date: new Date(),
				concept: 'string',
				currency: 'ARS',
				accountId: 'string',
				toAccountId: 'string',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
	},
);

export type MovementEndpoint = z.infer<typeof MovementEndpoint>;

export class Movement extends createZodDto(MovementEndpoint) {}
