import { Module } from '@nestjs/common';

import { AccountsController } from './accounts.controller';

@Module({
	controllers: [AccountsController],
	imports: [],
})
export class AccountsModule {}
