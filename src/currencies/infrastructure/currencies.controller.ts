import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Controller, Get, UsePipes } from '@nestjs/common';
import {
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiOperation,
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
	@ApiOperation({
		summary: 'List all supported currencies',
		description: 'List all supported currencies.',
	})
	@Get()
	findAll(): Promise<CurrencyList> {
		return this.currenciesService.findAll();
	}
}
