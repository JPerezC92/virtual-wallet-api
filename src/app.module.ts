import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AccountsModule } from '@/Accounts/infrastructure/accounts.module';
import { AuthModule } from '@/Auth/infrastructure/auth.module';
import { CurrenciesModule } from '@/Currencies/infrastructure/currencies.module';
import { DatabaseModule } from '@/Database/database.module';
import { MovementsModule } from '@/Movements/infrastructure/movements.module';
import { UsersModule } from '@/Users/infrastructure/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '/swagger-static'),
			serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
		}),
		ConfigModule.forRoot({
			envFilePath: ['.env.development.local', '.env.development', '.env.test'],
		}),
		AuthModule,
		UsersModule,
		DatabaseModule,
		CurrenciesModule,
		AccountsModule,
		MovementsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
