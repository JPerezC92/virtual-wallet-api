import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Controller, Get, UsePipes } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';

import { CurrenciesService } from '@/Currencies/infrastructure/service/currencies.service';
import * as sharedSchemas from '@/Shared/infrastructure/schemas';

@Controller('currencies')
@ApiTags('currencies')
@UsePipes(ZodValidationPipe)
export class CurrenciesController {
	constructor(readonly currenciesService: CurrenciesService) {}

	@ApiInternalServerErrorResponse({ type: sharedSchemas.ErrorResponseDto })
	@Get()
	findAll() {
		return this.currenciesService.findAll();
	}
}
