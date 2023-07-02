import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
	Body,
	ConflictException,
	Controller,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	UseGuards,
	UsePipes,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

import { UserAlreadyRegistered } from '@/Auth/domain';
import { UserFromReq } from '@/Auth/infrastructure/decorators';
import { AccountOwnerGuard } from '@/Auth/infrastructure/guards/AccountOwner.guard';
import { AccessJwtAuthGuard } from '@/Auth/infrastructure/service';
import * as sharedSchemas from '@/Shared/infrastructure/schemas';
import { User } from '@/Users/domain';
import * as usersSchemas from '@/Users/infrastructure/schemas';

import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
@UsePipes(ZodValidationPipe)
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Post()
	@ApiCreatedResponse({ type: usersSchemas.User })
	@ApiBadRequestResponse({ type: sharedSchemas.BadRequest })
	@ApiConflictResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiInternalServerErrorResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiOperation({
		summary: 'Create a new user',
		description: 'Create a new user.',
	})
	registerUser(
		@Body() userCreateDto: usersSchemas.UserCreateDto,
	): Promise<usersSchemas.UserEndpoint> {
		return this.usersService.registerUser(userCreateDto, [
			[UserAlreadyRegistered.name, ConflictException],
		]);
	}

	@Patch('/:id')
	@ApiCreatedResponse({ type: usersSchemas.User })
	@ApiBadRequestResponse({ type: sharedSchemas.BadRequest })
	@ApiConflictResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiInternalServerErrorResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiBearerAuth()
	@UseGuards(AccessJwtAuthGuard, AccountOwnerGuard)
	@ApiOperation({
		summary: 'Update a user',
		description: 'Update a user.',
	})
	updateUser(
		@Param('id', ParseUUIDPipe) _userId: string,
		@Body() userUpdateDto: usersSchemas.UserUpdateDto,
		@UserFromReq() user: User,
	): Promise<usersSchemas.UserEndpoint> {
		return this.usersService.updateUser(user, userUpdateDto);
	}
}
