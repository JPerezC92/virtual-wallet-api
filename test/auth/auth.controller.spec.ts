import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '@/Auth/infrastructure/auth.controller';
import { AuthService } from '@/Auth/infrastructure/auth.service';
import { BcryptPasswordCipher } from '@/Auth/infrastructure/service';
import { PrismaService } from '@/Database/prisma.service';
import { AppService } from '@/src/app.service';

describe('AuthController', () => {
	let controller: AuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [AuthService, AppService, PrismaService, BcryptPasswordCipher],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
