import { Module } from '@nestjs/common';

import { AppService } from '@/src/app.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	controllers: [AuthController],
	providers: [AuthService, AppService],
})
export class AuthModule {}
