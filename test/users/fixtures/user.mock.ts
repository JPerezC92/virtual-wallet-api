import { AccountMock, AccountMock2 } from '@/Test/accounts/domain';
import { User } from '@/Users/domain';

export const userMock = (money = 0) =>
	new User({
		firstName: 'userFirstNameTest',
		lastName: 'userLastNameTest',
		email: 'example@gmail.com',
		password: '123456aA-',
		id: '8aaea182-1086-4356-8a74-dbf7cdebd4fc',
		tokens: {},
		accountList: [AccountMock(money)],
		createdAt: new Date(),
		updatedAt: new Date(),
	});

export const userMock2 = (money = 0) =>
	new User({
		firstName: 'userFirstNameTest 2',
		lastName: 'userLastNameTest 2',
		email: 'example@gmail.com',
		password: '123456aA-',
		id: '32474044-df56-4273-b458-271245271763',
		tokens: {},
		accountList: [AccountMock2(money)],
		createdAt: new Date(),
		updatedAt: new Date(),
	});
