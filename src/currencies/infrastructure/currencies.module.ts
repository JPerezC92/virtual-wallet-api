import { Module } from '@nestjs/common';

import { CurrenciesService } from '@/Currencies/infrastructure/service';
import { DatabaseModule } from '@/Database/database.module';

import { CurrenciesController } from './currencies.controller';

@Module({
	controllers: [CurrenciesController],
	imports: [DatabaseModule],
	providers: [CurrenciesService],
})
export class CurrenciesModule {}
