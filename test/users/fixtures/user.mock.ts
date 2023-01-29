import { User } from '@/Users/domain';

export const userMock: User = {
	firstName: 'userFirstNameTest',
	lastName: 'userLastNameTest',
	email: 'example@gmail.com',
	password: '123456aA-',
	id: '123456',
	tokens: {},
	createdAt: new Date(),
	updatedAt: new Date(),
};
