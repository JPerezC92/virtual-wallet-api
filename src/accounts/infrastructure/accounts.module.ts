import { Module } from '@nestjs/common';

import { AccountsService } from '@/Accounts/infrastructure/services';
import { DatabaseModule } from '@/Database/database.module';

import { AccountsController } from './accounts.controller';

@Module({
	controllers: [AccountsController],
	imports: [DatabaseModule],
	providers: [AccountsService],
})
export class AccountsModule {}
