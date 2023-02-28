import { Account } from '@/Accounts/domain';
import { User } from '@/Users/domain';

export const AccountsMockRepository = () => ({
	createDefault: jest.fn<Promise<Account>, [Account]>(),
	create: jest.fn<Promise<Account>, [Account, User]>(),
	update: jest.fn<Promise<void>, [Account]>(),
	findById: jest.fn<Promise<Account | undefined>, [Account['id']]>(),
});
