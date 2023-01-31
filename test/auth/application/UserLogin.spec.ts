import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { UserLogin } from '@/Auth/application';
import { InvalidCredentials } from '@/Auth/domain';
import { AuthController } from '@/Auth/infrastructure/auth.controller';
import {
	AccessTokenCipher,
	BcryptPasswordCipher,
	RefreshTokenCipher,
} from '@/Auth/infrastructure/service';
import { AuthService } from '@/Auth/infrastructure/service/auth.service';
import { DatabaseModule } from '@/Database/database.module';
import { AppModule } from '@/src/app.module';
import { authMockRepository } from '@/Test/auth/infrastructure/authMockRepository';
import { userMock } from '@/Test/users/fixtures';
import { UsersMockRepository } from '@/Test/users/infrastructure';

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
		const usersMockRepository = UsersMockRepository();
		usersMockRepository.findByEmail.mockResolvedValue(userMock);
		jest.spyOn(bcryptPasswordCipher, 'compare').mockResolvedValue(true);

		const authToken = await UserLogin(
			authMockRepository,
			usersMockRepository,
			bcryptPasswordCipher,
			accessTokenCipher,
			refreshTokenCipher,
			(v) => v,
		).execute({
			credentials: { email: 'test@example.com', password: 'test' },
			ip,
		});

		expect(authToken).toEqual({
			accessToken: expect.any(String),
			refreshToken: expect.any(String),
		});
	});

	test('should throw a InvalidCredentials error when the user is not found', async () => {
		const usersMockRepository = UsersMockRepository();
		usersMockRepository.findByEmail.mockResolvedValue(undefined);
		jest.spyOn(bcryptPasswordCipher, 'compare').mockResolvedValue(true);

		try {
			await UserLogin(
				authMockRepository,
				usersMockRepository,
				bcryptPasswordCipher,
				accessTokenCipher,
				refreshTokenCipher,
				(v) => v,
			).execute({
				credentials: { email: 'test@example.com', password: 'test' },
				ip,
			});
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidCredentials);
		}
	});

	test('should throw a InvalidCredentials error when the passwords doesnt match', async () => {
		const usersMockRepository = UsersMockRepository();
		usersMockRepository.findByEmail.mockResolvedValue(userMock);
		jest.spyOn(bcryptPasswordCipher, 'compare').mockResolvedValue(false);

		try {
			await UserLogin(
				authMockRepository,
				usersMockRepository,
				bcryptPasswordCipher,
				accessTokenCipher,
				refreshTokenCipher,
				(v) => v,
			).execute({
				credentials: { email: 'test@example.com', password: 'test' },
				ip,
			});
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidCredentials);
		}
	});
});
