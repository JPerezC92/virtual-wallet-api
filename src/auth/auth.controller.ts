import { Controller, Get } from '@nestjs/common';

import { AppService } from '@/src/app.service';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly appService: AppService,
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
}
