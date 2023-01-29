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
	@ApiConflictResponse({ type: sharedSchemas.Error })
	registerUser(
		@Body() createuserDto: usersSchemas.UserCreateDto,
	): Promise<usersSchemas.UserEndpoint> {
		return this.usersService.registerUser(createuserDto, [
			[UserAlreadyRegistered.name, ConflictException],
		]);
	}
}
