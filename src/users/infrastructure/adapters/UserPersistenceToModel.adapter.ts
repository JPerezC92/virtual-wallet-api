import { UserDB } from '@prisma/client';
import { z } from 'zod';

import { User } from '@/Users/domain';

const userStoreValidator = z
	.object({
		id: z.string(),
		email: z.string(),
		firstName: z.string(),
		lastName: z.string(),
		password: z.string(),
		tokens: z.record(z.string(), z.string()),
		createdAt: z.date(),
		updatedAt: z.date(),
	})
	.transform((userStored) => new User(userStored));

export function UserPersistenceToModel(userStored: UserDB): User {
	return userStoreValidator.parse(userStored);
}
