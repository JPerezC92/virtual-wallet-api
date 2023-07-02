import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { UserDetails } from '@/Users/infrastructure/schemas/userDetailsEndpoint';

// function removeUndefined<T>(obj: T): T {
// 	const newObj = {} as T;
// 	for (const key in obj) {
// 		if (obj[key] !== undefined) {
// 			newObj[key] = obj[key];
// 		}
// 	}
// 	return newObj;
// }

export const UserUpdate = extendApi(
	UserDetails.merge(
		z.object({
			password: z.string().min(1),
		}),
	).partial(),
	{ title: 'UserUpdateDto', description: 'User update' },
);

export type UserUpdateDto2 = z.infer<typeof UserUpdate>;

export class UserUpdateDto extends createZodDto(UserUpdate) {}
