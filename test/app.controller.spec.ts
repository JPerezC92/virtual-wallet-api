import { Test, TestingModule } from '@nestjs/testing';

import { AuthModule } from '@/Auth/infrastructure/auth.module';
import { DatabaseModule } from '@/Database/database.module';
import { AppController } from '@/src/app.controller';
import { AppService } from '@/src/app.service';

describe('AppController', () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [AuthModule, DatabaseModule],
			controllers: [AppController],
			providers: [AppService],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			expect(appController.getHello()).toBe('Hello World!');
		});
	});
});
