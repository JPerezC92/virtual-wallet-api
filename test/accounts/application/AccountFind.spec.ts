import { AccountFind } from '@/Accounts/application';
import { Account } from '@/Accounts/domain';
import { AccountNotFound } from '@/Movements/domain';
import { userMock } from '@/Test/users/fixtures';
import { UsersMockRepository } from '@/Test/users/infrastructure';
import { UserNotFound } from '@/Users/domain';

describe('AccountFind use case', () => {
	test('should successfully return an Account', async () => {
		const user = userMock();
		const usersRepo = UsersMockRepository();
		const account = user.accountList?.[0];

		usersRepo.findByUserId.mockResolvedValue(user);

		const result = await AccountFind(usersRepo, (v) => v).execute({
			accountId: account?.id || '',
			userId: user.id || '',
		});

		expect(result).toBeInstanceOf(Account);
		expect(result).toEqual(account);
	});

	test('should throw an error if the user does not exist', async () => {
		const user = userMock();
		const usersRepo = UsersMockRepository();

		usersRepo.findByUserId.mockResolvedValue(undefined);

		await expect(
			AccountFind(usersRepo, (v) => v).execute({
				accountId: user.accountList?.[0]?.id || '',
				userId: user.id || '',
			}),
		).rejects.toThrowError(UserNotFound);
	});

	test('should throw an error if the account does not exist', async () => {
		const user = userMock();
		const usersRepo = UsersMockRepository();

		usersRepo.findByUserId.mockResolvedValue(user);

		await expect(
			AccountFind(usersRepo, (v) => v).execute({
				accountId: 'non-existing-account-id',
				userId: user.id || '',
			}),
		).rejects.toThrowError(AccountNotFound);
	});
});
