import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/Database/database.module';
import { MovementsService } from '@/Movements/infrastructure/services';

import { MovementsController } from './movements.controller';

@Module({
	controllers: [MovementsController],
	imports: [DatabaseModule],
	providers: [MovementsService],
})
export class MovementsModule {}
