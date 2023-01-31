import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	UnprocessableEntityException,
	UseGuards,
	UsePipes,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiHeader,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
	ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import * as requestIP from 'request-ip';

import * as authDomain from '@/Auth/domain';
import { UserFromReq } from '@/Auth/infrastructure/decorators';
import * as authSchemas from '@/Auth/infrastructure/schemas';
import {
	AccessJwtAuthGuard,
	AuthService,
	RefreshJwtAuthGuard,
} from '@/Auth/infrastructure/service';
import * as sharedSchemas from '@/Shared/infrastructure/schemas';
import { User } from '@/Users/domain';
import * as usersSchemas from '@/Users/infrastructure/schemas';

@Controller('auth')
@ApiTags('auth')
@UsePipes(ZodValidationPipe)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiCreatedResponse({ type: authSchemas.AuthTokenDto })
	@ApiBadRequestResponse({ type: sharedSchemas.BadRequest })
	@ApiUnprocessableEntityResponse({ type: sharedSchemas.Error })
	@Post()
	registerUser(
		@Req() req: Request,
		@Body() credentialsDto: authSchemas.CredentialsDto,
	): Promise<authSchemas.AuthTokenDto> {
		return this.authService.login(
			credentialsDto,
			requestIP.getClientIp(req) || req.ip,
			[[authDomain.InvalidCredentials.name, UnprocessableEntityException]],
		);
	}

	@ApiBearerAuth()
	@ApiOkResponse({ type: usersSchemas.User })
	@ApiUnauthorizedResponse({ type: sharedSchemas.Unauthorized })
	@UseGuards(AccessJwtAuthGuard)
	@Get('me')
	me(@UserFromReq() user: User): usersSchemas.User {
		return usersSchemas.UserEndpoint.parse(user);
	}

	@ApiHeader({ name: 'x-refresh-token' })
	@ApiUnauthorizedResponse({ type: sharedSchemas.Unauthorized })
	@UseGuards(RefreshJwtAuthGuard)
	@Get('refresh-token')
	refreshToken(@UserFromReq() user: User) {
		return { user };
	}
}
