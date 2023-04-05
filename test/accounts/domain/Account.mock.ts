import { Account } from '@/Accounts/domain';

export const AccountMock = (income = 0, expense = 0) =>
	new Account({
		id: 'ac366170-c0e8-425b-a23f-5e5adff1ed58',
		income: income,
		expense: expense,
		currency: 'ARS',
		userId: '8aaea182-1086-4356-8a74-dbf7cdebd4fc',
		createdAt: new Date(),
		updatedAt: new Date(),
	});

export const AccountMock2 = (income = 0, expense = 0) =>
	new Account({
		id: '20e3dd0f-6289-49cf-86c4-8139b2c134dd',
		income: income,
		expense: expense,
		currency: 'ARS',
		userId: '32474044-df56-4273-b458-271245271763',
		createdAt: new Date(),
		updatedAt: new Date(),
	});
