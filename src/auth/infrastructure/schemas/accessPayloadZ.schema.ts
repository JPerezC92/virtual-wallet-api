import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const accessPayloadZ = extendApi(
	z.object({
		email: z.string().email(),
		userId: z.string(),
	}),
	{ title: 'Access Payload' },
);
