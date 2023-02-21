import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiTags,
} from '@nestjs/swagger';

import * as accountSchemas from '@/Accounts/infrastructure/schemas';
import { AccountsService } from '@/Accounts/infrastructure/services';
import { UserFromReq } from '@/Auth/infrastructure/decorators';
import { AccessJwtAuthGuard } from '@/Auth/infrastructure/service';
import * as sharedSchemas from '@/Shared/infrastructure/schemas';
import { User } from '@/Users/domain';

@ApiTags('accounts')
@Controller('accounts')
@UsePipes(ZodValidationPipe)
export class AccountsController {
	constructor(private accountsService: AccountsService) {}

	@ApiNotFoundResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiCreatedResponse({ type: accountSchemas.Account })
	@ApiInternalServerErrorResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiBearerAuth()
	@UseGuards(AccessJwtAuthGuard)
	@Post()
	create(
		@UserFromReq() user: User,
		@Body() accountCreateDto: accountSchemas.AccountCreateDto,
	): Promise<accountSchemas.Account> {
		return this.accountsService.createAccount(user, accountCreateDto);
	}
}
