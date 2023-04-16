import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { MovementType } from '@/Movements/domain';

const baseExample = {
	amount: 'number',
	date: new Date().toISOString(),
	concept: 'A short description of the movement',
	accountId: 'string',
};

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
				...baseExample,
				type: MovementType.TOPUP,
			},
			{
				...baseExample,
				type: MovementType.PAYMENT,
			},
			{
				...baseExample,
				type: MovementType.TRANSFERENCE,
				toAccountId: 'string',
			},
		],
	},
);

export type MovementCreate = z.infer<typeof MovementCreate>;

export class MovementDto extends createZodDto(MovementCreate) {}
