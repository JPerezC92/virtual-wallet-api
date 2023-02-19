import { Module } from '@nestjs/common';

import { CurrencyService } from '@/Currency/infrastructure/currency.service';
import { DatabaseModule } from '@/Database/database.module';

import { CurrencyController } from './currency.controller';

@Module({
	controllers: [CurrencyController],
	imports: [DatabaseModule],
	providers: [CurrencyService],
})
export class CurrencyModule {}
