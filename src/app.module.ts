import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/Auth/infrastructure/auth.module';
import { DatabaseModule } from '@/Database/database.module';
import { UsersModule } from '@/Users/infrastructure/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['.env.development.local', '.env.development'],
		}),
		AuthModule,
		UsersModule,
		DatabaseModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
