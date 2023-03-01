import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
	Body,
	ConflictException,
	Controller,
	Post,
	UsePipes,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

import { UserAlreadyRegistered } from '@/Auth/domain';
import * as sharedSchemas from '@/Shared/infrastructure/schemas';
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
}
