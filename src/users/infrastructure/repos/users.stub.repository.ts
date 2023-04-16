import { accountStub1, accountStub2 } from '@/Accounts/infrastructure/repos';
import { User, UsersRepository } from '@/Users/domain';

export const userNotRegisteredStub: User = new User({
	id: '999999999999999',
	accountList: [],
	userDetails: {
		firstName: 'Not',
		lastName: 'Exist',
		email: 'not@exist.com',
	},
	updatedAt: new Date(),
	createdAt: new Date(),
	password: '123456',
	tokens: {},
});

export const userStub1: User = new User({
	id: '1',
	accountList: [accountStub1],
	userDetails: {
		firstName: 'John',
		lastName: 'Doe',
		email: 'jhon.doe@gmail.com',
	},
	updatedAt: new Date(),
	createdAt: new Date(),
	password: '123456',
	tokens: {},
});

export const userStub2: User = new User({
	id: '2',
	accountList: [accountStub2],
	userDetails: {
		firstName: 'Jane',
		lastName: 'Doe',
		email: 'jane.doe@gmail.com',
	},
	updatedAt: new Date(),
	createdAt: new Date(),
	password: '123456',
	tokens: {},
});

export const usersStub: User[] = [userStub1, userStub2];

export function UsersStubRepository(): UsersRepository {
	return {
		findByUserId: async (userId: User['id']) => {
			return usersStub.find((user) => user.id === userId);
		},
		findByEmail: async (email: User['userDetails']['email']) => {
			return usersStub.find((user) => user.userDetails.email === email);
		},
		register: async (user: User) => {
			usersStub.push(user);
		},
	};
}
