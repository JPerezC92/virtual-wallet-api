import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { UpdatePassword } from '@/Auth/application';
import { IncorrectOldPassword } from '@/Auth/domain';
import { AuthController } from '@/Auth/infrastructure/auth.controller';
import {
	AccessTokenCipher,
	AuthService,
	BcryptPasswordCipher,
	RefreshTokenCipher,
} from '@/Auth/infrastructure/service';
import { DatabaseModule } from '@/Database/database.module';
import { AppModule } from '@/src/app.module';
import { UserNotFound } from '@/Users/domain';
import { UsersStubRepository, userStub1 } from '@/Users/infrastructure/repos';

describe('UpdatePassword use case', () => {
	let bcryptPasswordCipher: BcryptPasswordCipher;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule, JwtModule, DatabaseModule, AppModule],
			controllers: [AuthController],
			providers: [
				BcryptPasswordCipher,
				RefreshTokenCipher,
				AuthService,
				AccessTokenCipher,
			],
		}).compile();

		bcryptPasswordCipher =
			module.get<BcryptPasswordCipher>(BcryptPasswordCipher);
	});

	test('should update the password successfully', async () => {
		jest.spyOn(bcryptPasswordCipher, 'compare').mockResolvedValue(true);
		jest
			.spyOn(bcryptPasswordCipher, 'encrypt')
			.mockImplementation((v) => Promise.resolve(v));

		// GIVEN
		const user = userStub1;
		const newPassword = 'new-password';
		const oldPassword = user.password;
		const id = user.id;
		const usersRepository = UsersStubRepository();
		const passwordCipher = bcryptPasswordCipher;

		// WHEN
		await UpdatePassword(usersRepository, passwordCipher).execute({
			id,
			password: oldPassword,
			newPassword,
		});

		// THEN
		const updatedUser = await usersRepository.findByUserId(id);
		expect(updatedUser?.password).not.toEqual(oldPassword);
		expect(updatedUser?.password).toEqual(newPassword);
	});

	test('should throw an error if the user is not found', async () => {
		// GIVEN
		const user = userStub1;
		const newPassword = 'new-password';
		const oldPassword = user.password;
		const id = 'fake-id';
		const usersRepository = UsersStubRepository();
		const passwordCipher = bcryptPasswordCipher;

		// WHEN
		const updatePassword = UpdatePassword(
			usersRepository,
			passwordCipher,
		).execute({
			id,
			password: oldPassword,
			newPassword,
		});

		// THEN
		await expect(updatePassword).rejects.toThrow(UserNotFound);
	});

	test('should throw an error if the old password is incorrect', async () => {
		jest
			.spyOn(bcryptPasswordCipher, 'compare')
			.mockImplementation((password1: string, password2: string) => {
				return Promise.resolve(password1 === password2);
			});
		jest
			.spyOn(bcryptPasswordCipher, 'encrypt')
			.mockImplementation((v) => Promise.resolve(v));

		// GIVEN
		const user = userStub1;
		const newPassword = 'new-password';
		const oldPassword = 'fake-password';
		const id = user.id;
		const usersRepository = UsersStubRepository();
		const passwordCipher = bcryptPasswordCipher;

		// WHEN
		const updatePassword = UpdatePassword(
			usersRepository,
			passwordCipher,
		).execute({
			id,
			password: oldPassword,
			newPassword,
		});

		// THEN
		await expect(updatePassword).rejects.toThrow(IncorrectOldPassword);
	});
});
