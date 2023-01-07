import { User as UserPrisma } from '@prisma/client';

import { User } from '@/Users/domain';

export function UserPersistenceToModel(userStored: UserPrisma): User {
	return new User({ ...userStored });
}
