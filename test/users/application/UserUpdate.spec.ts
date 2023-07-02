import { UserUpdate } from '@/Users/application';
import { UserNotFound } from '@/Users/domain';
import { UsersStubRepository, userStub1 } from '@/Users/infrastructure/repos';

describe('UserUpdate use case', () => {
	test('should update the user successfully', async () => {
		// GIVEN
		const user = userStub1;
		const usersRepository = UsersStubRepository();
		const userUpdateMock = {
			firstName: 'Jhon',
			lastName: 'Test',
		};

		// WHEN
		await UserUpdate(usersRepository, (v) => v).execute({
			id: user.id,
			userDetails: userUpdateMock,
		});

		// THEN
		const updatedUser = await usersRepository.findByUserId(user.id);
		expect(updatedUser?.userDetails.firstName).toEqual(
			userUpdateMock.firstName,
		);
		expect(updatedUser?.userDetails.lastName).toEqual(userUpdateMock.lastName);
	});

	test('should throw an error if the user is not found', async () => {
		// GIVEN
		const usersRepository = UsersStubRepository();
		const userUpdateMock = {
			firstName: 'Jhon',
			lastName: 'Test',
		};

		// WHEN
		const userUpdate = UserUpdate(usersRepository, (v) => v);
		const promise = userUpdate.execute({
			id: 'fake-id',
			userDetails: userUpdateMock,
		});

		// THEN
		await expect(promise).rejects.toThrowError(UserNotFound);
	});
});
