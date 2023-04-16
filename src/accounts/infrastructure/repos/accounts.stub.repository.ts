import { Account, AccountsRepository } from '@/Accounts/domain';
import { currencyStub1 } from '@/Currencies/infrastructure/repos';

export const accountStub1: Account = new Account({
	id: '1',
	userId: '1',
	currency: currencyStub1,
	expense: 0,
	income: 9999,
	updatedAt: new Date(),
	createdAt: new Date(),
});

export const accountStub2: Account = new Account({
	id: '2',
	userId: '2',
	currency: currencyStub1,
	expense: 0,
	income: 0,
	updatedAt: new Date(),
	createdAt: new Date(),
});

export const accountStubWithoutUser: Account = new Account({
	id: '999999999999999',
	userId: '',
	currency: 'EUR',
	expense: 0,
	income: 0,
	updatedAt: new Date(),
	createdAt: new Date(),
});

export const accountsStub: Account[] = [
	accountStub1,
	accountStub2,
	accountStubWithoutUser,
];

export function AccounstStubRepository(): AccountsRepository {
	return {
		findById: async (accountId: Account['id']) => {
			return accountsStub.find((account) => account.id === accountId);
		},
		update: async (account: Account) => {
			const index = accountsStub.findIndex((a) => a.id === account.id);
			accountsStub[index] = account;
			return Promise.resolve();
		},
		create: async (account: Account) => {
			accountsStub.push(account);
			return Promise.resolve(account);
		},
		createDefault: async (account: Account) => {
			accountsStub.push(account);
			return Promise.resolve(account);
		},
	};
}
