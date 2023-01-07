import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '@/Auth/infrastructure/auth.service';
import { BcryptPasswordCipher } from '@/Auth/infrastructure/service';
import { PrismaService } from '@/Database/prisma.service';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthService, PrismaService, BcryptPasswordCipher],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
