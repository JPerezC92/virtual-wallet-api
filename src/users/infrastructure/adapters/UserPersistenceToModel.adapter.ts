import { UserDB } from '@prisma/client';
import { z } from 'zod';

import { AccountDBValidator } from '@/Accounts/infrastructure/adapters';
import { User } from '@/Users/domain';

const userDBValidator = z
	.object({
		id: z.string(),
		email: z.string(),
		firstName: z.string(),
		lastName: z.string(),
		password: z.string(),
		tokens: z.record(z.string(), z.string()),
		accountList: z.array(AccountDBValidator),
		createdAt: z.date(),
		updatedAt: z.date(),
	})
	.transform((userDB) => new User(userDB));

export function UserPersistenceToModel(userDB: UserDB): User {
	return userDBValidator.parse(userDB);
}
