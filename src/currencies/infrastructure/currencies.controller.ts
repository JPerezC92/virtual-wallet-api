import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Controller, Get, UsePipes } from '@nestjs/common';
import {
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiTags,
} from '@nestjs/swagger';

import { CurrencyList } from '@/Currencies/infrastructure/schemas';
import { CurrenciesService } from '@/Currencies/infrastructure/service';
import * as sharedSchemas from '@/Shared/infrastructure/schemas';

@Controller('currencies')
@ApiTags('currencies')
@UsePipes(ZodValidationPipe)
export class CurrenciesController {
	constructor(readonly currenciesService: CurrenciesService) {}

	@ApiInternalServerErrorResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiOkResponse({ type: CurrencyList })
	@Get()
	findAll(): Promise<CurrencyList> {
		return this.currenciesService.findAll();
	}
}
