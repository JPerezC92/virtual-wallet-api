import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Controller, Get, UsePipes } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';

import { CurrencyService } from '@/Currency/infrastructure/currency.service';
import * as sharedSchemas from '@/Shared/infrastructure/schemas';

@Controller('currency')
@ApiTags('currency')
@UsePipes(ZodValidationPipe)
export class CurrencyController {
	constructor(readonly currencyService: CurrencyService) {}

	@ApiInternalServerErrorResponse({ type: sharedSchemas.InternalServerError })
	@Get()
	findAll() {
		return this.currencyService.findAll();
	}
}
