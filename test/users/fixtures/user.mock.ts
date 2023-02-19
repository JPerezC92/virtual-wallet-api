import { User } from '@/Users/domain';

export const userMock: User = new User({
	firstName: 'userFirstNameTest',
	lastName: 'userLastNameTest',
	email: 'example@gmail.com',
	password: '123456aA-',
	id: '123456',
	tokens: {},
	accountList: [],
	createdAt: new Date(),
	updatedAt: new Date(),
});
