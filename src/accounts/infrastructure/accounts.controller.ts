import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	UseGuards,
	UsePipes,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

import * as accountSchemas from '@/Accounts/infrastructure/schemas';
import { AccountsService } from '@/Accounts/infrastructure/services';
import { UserFromReq } from '@/Auth/infrastructure/decorators';
import { AccessJwtAuthGuard } from '@/Auth/infrastructure/service';
import * as movementsSchemas from '@/Movements/infrastructure/schemas';
import * as sharedSchemas from '@/Shared/infrastructure/schemas';
import { User } from '@/Users/domain';
import * as userSchemas from '@/Users/infrastructure/schemas';

@ApiTags('accounts')
@Controller('accounts')
@UsePipes(ZodValidationPipe)
export class AccountsController {
	constructor(private accountsService: AccountsService) {}

	@ApiNotFoundResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiCreatedResponse({ type: accountSchemas.Account })
	@ApiInternalServerErrorResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiBearerAuth()
	@ApiOperation({
		summary: 'Create a new account',
		description: 'Create a new account.',
	})
	@UseGuards(AccessJwtAuthGuard)
	@Post()
	create(
		@UserFromReq() user: User,
		@Body() accountCreateDto: accountSchemas.AccountCreateDto,
	): Promise<accountSchemas.Account> {
		return this.accountsService.createAccount(user, accountCreateDto);
	}

	@ApiOkResponse({ type: accountSchemas.Account })
	@ApiNotFoundResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiInternalServerErrorResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiBearerAuth()
	@ApiOperation({
		summary: 'Find an account by id',
		description: 'Find an account by id.',
	})
	@UseGuards(AccessJwtAuthGuard)
	@Get(':id')
	getById(
		@Param('id', ParseUUIDPipe) accountId: string,
		@UserFromReq() user: User,
	): Promise<accountSchemas.Account> {
		return this.accountsService.getById(accountId, user);
	}

	@ApiOkResponse({ type: userSchemas.UserDetailsDto })
	@ApiNotFoundResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiInternalServerErrorResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiBearerAuth()
	@ApiOperation({
		summary: 'Find user details by account id',
		description: 'Find the user information associated with an account.',
	})
	@UseGuards(AccessJwtAuthGuard)
	@Get(':id/transference-details')
	getTransferenceDetails(
		@Param('id', ParseUUIDPipe) accountId: string,
	): Promise<movementsSchemas.TransferenceDetailsDto> {
		return this.accountsService.TransferenceDetails(accountId);
	}
}
