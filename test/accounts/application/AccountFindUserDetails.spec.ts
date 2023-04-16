import { AccountFindTransferenceDetails } from '@/Accounts/application';
import { Account } from '@/Accounts/domain';
import {
	AccounstStubRepository,
	accountStubWithoutUser,
} from '@/Accounts/infrastructure/repos';
import { AccountNotFound } from '@/Movements/domain';
import { UserNotFound } from '@/Users/domain';
import { UsersStubRepository, userStub1 } from '@/Users/infrastructure/repos';

describe('AccountFindUserDetails use case', () => {
	test('should successfully return the user information asociated to the account', async () => {
		// GIVEN
		const user = userStub1;

		// WHEN
		const result = await AccountFindTransferenceDetails(
			AccounstStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({ accountId: user.id });

		// THEN
		expect(result.userDetails).toStrictEqual(user.userDetails);
		expect(result.account).toBeInstanceOf(Account);
	});

	test('should throw an error if the account does not exist', async () => {
		// GIVEN
		const fakeAccountId = 'fake-account-id';

		// WHEN
		const result = AccountFindTransferenceDetails(
			AccounstStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({ accountId: fakeAccountId });

		// THEN
		await expect(result).rejects.toThrowError(AccountNotFound);
	});

	test('should throw an error if the account does not have an associated user', async () => {
		// GIVEN
		const accountWithoutUser = accountStubWithoutUser;

		// WHEN
		const result = AccountFindTransferenceDetails(
			AccounstStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({ accountId: accountWithoutUser.id });

		// THEN
		await expect(result).rejects.toThrowError(UserNotFound);
	});
});
