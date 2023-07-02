import { Logout } from '@/Auth/application';
import { AuthStubRepository } from '@/Auth/infrastructure/repos';
import { UserNotFound } from '@/Users/domain';
import { UsersStubRepository, userStub1 } from '@/Users/infrastructure/repos';

describe('Logout use case', () => {
	test('should logout successfully', async () => {
		// GIVEN
		const user = userStub1;
		const ip = Object.keys(user.tokens)[0] || '1';

		// WHEN
		const result = await Logout(
			AuthStubRepository(),
			UsersStubRepository(),
		).execute({
			ip,
			userId: user.id,
		});

		// THEN
		expect(user.tokens[ip]).toBeUndefined();
		expect(result).toBeUndefined();
	});

	test('should throw UserNotFound error', () => {
		const result = Logout(AuthStubRepository(), UsersStubRepository()).execute({
			ip: '1',
			userId: 'not-found',
		});

		// THEN
		expect(result).rejects.toThrow(UserNotFound);
	});
});
