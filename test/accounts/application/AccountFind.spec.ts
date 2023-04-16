import { AccountFind } from '@/Accounts/application';
import { Account } from '@/Accounts/domain';
import {
	AccounstStubRepository,
	accountStub1,
} from '@/Accounts/infrastructure/repos';
import { AccountNotFound } from '@/Movements/domain';
import { UserNotFound } from '@/Users/domain';
import { UsersStubRepository, userStub1 } from '@/Users/infrastructure/repos';

describe('AccountFind use case', () => {
	test('should successfully return an Account', async () => {
		// GIVEN
		const account = accountStub1;
		const user = userStub1;

		// WHEN
		const result = await AccountFind(
			AccounstStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({
			accountId: account.id,
			userId: user.id,
		});

		// THEN
		expect(result).toBeInstanceOf(Account);
		expect(result).toEqual(account);
	});

	test('should throw an error if the user does not exist', async () => {
		// GIVEN
		const account = accountStub1;

		await expect(
			AccountFind(
				AccounstStubRepository(),
				UsersStubRepository(),
				(v) => v,
			).execute({
				accountId: account.id,
				userId: 'non-existing-user-id',
			}),
		).rejects.toThrowError(UserNotFound);
	});

	test('should throw an error if the account does not exist', async () => {
		// GIVEN
		const user = userStub1;

		await expect(
			AccountFind(
				AccounstStubRepository(),
				UsersStubRepository(),
				(v) => v,
			).execute({
				accountId: 'non-existing-account-id',
				userId: user.id,
			}),
		).rejects.toThrowError(AccountNotFound);
	});
});
