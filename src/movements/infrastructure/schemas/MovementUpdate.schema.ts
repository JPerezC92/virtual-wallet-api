import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { MovementType } from '@/Movements/domain';

import { MovementEndpointBase } from './MovementEndpoint.schema';

export const MovementUpdateBase = MovementEndpointBase.pick({
	id: true,
	amount: true,
	currency: true,
	concept: true,
	accountId: true,
}).merge(
	z.object({
		date: z
			.string()
			.datetime()
			.transform((date) => new Date(date)),
		createdAt: z
			.string()
			.datetime()
			.transform((date) => new Date(date)),
		updatedAt: z
			.string()
			.datetime()
			.transform((date) => new Date(date)),
	}),
);

const MovementUpdateSchema = extendApi(
	z.discriminatedUnion('type', [
		z
			.object({
				type: z.literal(MovementType.TOPUP),
			})
			.merge(MovementUpdateBase),
		z
			.object({
				type: z.literal(MovementType.PAYMENT),
			})
			.merge(MovementUpdateBase),
	]),
);

export class MovementUpdate extends createZodDto(MovementUpdateSchema) {}
