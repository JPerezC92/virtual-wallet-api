import { Module } from '@nestjs/common';

import { AuthModule } from '@/Auth/infrastructure/auth.module';
import { DatabaseModule } from '@/Database/database.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	imports: [AuthModule, DatabaseModule],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
