import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { RevalidateAccess } from '@/Auth/application';
import { AuthController } from '@/Auth/infrastructure/auth.controller';
import { AuthStubRepository } from '@/Auth/infrastructure/repos';
import {
	AccessTokenCipher,
	AuthService,
	BcryptPasswordCipher,
	RefreshTokenCipher,
} from '@/Auth/infrastructure/service';
import { DatabaseModule } from '@/Database/database.module';
import { AppModule } from '@/src/app.module';
import { userStub1 } from '@/Users/infrastructure/repos';

describe('RevalidateAccess use case', () => {
	let accessTokenCipher: AccessTokenCipher;
	let refreshTokenCipher: RefreshTokenCipher;

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
	});

	test('should return new AuthToken credentials', async () => {
		const authToken = await RevalidateAccess(
			AuthStubRepository(),
			accessTokenCipher,
			refreshTokenCipher,
		).execute({ user: userStub1, ip: '127.0.0.1' });

		expect(authToken).toEqual({
			accessToken: expect.any(String),
			refreshToken: expect.any(String),
		});
	});
});
