import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '@/Auth/auth.controller';
import { AuthService } from '@/Auth/auth.service';
import { AppService } from '@/src/app.service';

describe('AuthController', () => {
	let controller: AuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [AuthService, AppService],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
