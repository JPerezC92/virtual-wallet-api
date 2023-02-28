import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { MovementType } from '@/Movements/domain';

const MovementBase = z.object({
	amount: z.number(),

	date: z
		.string()
		.datetime()
		.transform((date) => new Date(date)),
	concept: z.string(),
	accountId: z.string().uuid(),
});

export const MovementCreate = extendApi(
	z.discriminatedUnion('type', [
		z
			.object({
				type: z.literal(MovementType.TOPUP),
			})
			.merge(MovementBase),
		z
			.object({
				type: z.literal(MovementType.PAYMENT),
			})
			.merge(MovementBase),
		z
			.object({
				type: z.literal(MovementType.TRANSFERENCE),
				toAccountId: z.string().uuid(),
			})
			.merge(MovementBase),
	]),
	{
		title: 'MovementCreate',
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

export type MovementCreate = z.infer<typeof MovementCreate>;

export class MovementDto extends createZodDto(MovementCreate) {}
