import { User } from '@/Users/domain';

export const UsersMockRepository = () => ({
	findByEmail: jest.fn<Promise<User | undefined>, [User['email']]>(),
	findByUserId: jest.fn<Promise<User | undefined>, [User['id']]>(),
	register: jest.fn<Promise<void>, [User]>(),
});
