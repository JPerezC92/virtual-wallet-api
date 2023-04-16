import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { UserLogin } from '@/Auth/application';
import { InvalidCredentials } from '@/Auth/domain';
import { AuthController } from '@/Auth/infrastructure/auth.controller';
import { AuthStubRepository } from '@/Auth/infrastructure/repos';
import {
	AccessTokenCipher,
	BcryptPasswordCipher,
	RefreshTokenCipher,
} from '@/Auth/infrastructure/service';
import { AuthService } from '@/Auth/infrastructure/service/auth.service';
import { DatabaseModule } from '@/Database/database.module';
import { AppModule } from '@/src/app.module';
import { UsersStubRepository, userStub1 } from '@/Users/infrastructure/repos';

describe('UserLogin use case', () => {
	let accessTokenCipher: AccessTokenCipher;
	let refreshTokenCipher: RefreshTokenCipher;
	let bcryptPasswordCipher: BcryptPasswordCipher;
	const ip = '167.456.45.4';

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule, JwtModule, DatabaseModule, AppModule],
			exports: [BcryptPasswordCipher],
			controllers: [AuthController],
			providers: [
				AccessTokenCipher,
				AuthService,
				BcryptPasswordCipher,
				RefreshTokenCipher,
			],
		}).compile();

		accessTokenCipher = module.get<AccessTokenCipher>(AccessTokenCipher);
		refreshTokenCipher = module.get<RefreshTokenCipher>(RefreshTokenCipher);
		bcryptPasswordCipher =
			module.get<BcryptPasswordCipher>(BcryptPasswordCipher);
	});

	test('should login successfully', async () => {
		// GIVEN
		jest.spyOn(bcryptPasswordCipher, 'compare').mockResolvedValue(true);
		const user = userStub1;

		// WHEN
		const authDetails = await UserLogin(
			AuthStubRepository(),
			UsersStubRepository(),
			bcryptPasswordCipher,
			accessTokenCipher,
			refreshTokenCipher,
			(v) => v,
		).execute({
			credentials: {
				email: user.userDetails.email,
				password: user.password,
			},
			ip,
		});

		// THEN
		expect(authDetails).toEqual({
			accessToken: expect.any(String),
			refreshToken: expect.any(String),
		});
	});

	test('should throw a InvalidCredentials error when the user is not found', async () => {
		// GIVEN
		const user = userStub1;
		jest.spyOn(bcryptPasswordCipher, 'compare').mockResolvedValue(true);

		// WHEN
		const result = UserLogin(
			AuthStubRepository(),
			UsersStubRepository(),
			bcryptPasswordCipher,
			accessTokenCipher,
			refreshTokenCipher,
			(v) => v,
		).execute({
			credentials: { email: 'email-not-register', password: user.password },
			ip,
		});

		// THEN
		expect(result).rejects.toThrow(InvalidCredentials);
	});

	test('should throw a InvalidCredentials error when the passwords doesnt match', async () => {
		// GIVEN
		const user = userStub1;
		jest.spyOn(bcryptPasswordCipher, 'compare').mockResolvedValue(false);

		// WHEN
		const result = UserLogin(
			AuthStubRepository(),
			UsersStubRepository(),
			bcryptPasswordCipher,
			accessTokenCipher,
			refreshTokenCipher,
			(v) => v,
		).execute({
			credentials: {
				email: user.userDetails.email,
				password: 'fake-password',
			},
			ip,
		});

		// THEN
		expect(result).rejects.toThrow(InvalidCredentials);
	});
});
