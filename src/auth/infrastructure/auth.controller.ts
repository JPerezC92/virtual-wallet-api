import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Req,
	UseGuards,
	UsePipes,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiHeader,
	ApiInternalServerErrorResponse,
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

	@ApiOkResponse({ type: authSchemas.AuthToken })
	@ApiBadRequestResponse({ type: sharedSchemas.BadRequest })
	@ApiUnprocessableEntityResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiInternalServerErrorResponse({ type: sharedSchemas.ErrorResponseDto })
	@Post()
	@HttpCode(200)
	login(
		@Req() req: Request,
		@Body() credentialsDto: authSchemas.CredentialsDto,
	): Promise<authSchemas.AuthToken> {
		return this.authService.login(
			credentialsDto,
			requestIP.getClientIp(req) || req.ip,
		);
	}

	@ApiBearerAuth()
	@ApiOkResponse({ type: usersSchemas.User })
	@ApiUnauthorizedResponse({ type: sharedSchemas.Unauthorized })
	@ApiInternalServerErrorResponse({ type: sharedSchemas.ErrorResponseDto })
	@UseGuards(AccessJwtAuthGuard)
	@Get('me')
	me(@UserFromReq() user: User): usersSchemas.User {
		return usersSchemas.UserEndpoint.parse(user);
	}

	@ApiOkResponse({ type: authSchemas.AuthToken })
	@ApiHeader({ name: 'x-refresh-token' })
	@ApiUnauthorizedResponse({ type: sharedSchemas.Unauthorized })
	@ApiInternalServerErrorResponse({ type: sharedSchemas.ErrorResponseDto })
	@UseGuards(RefreshJwtAuthGuard)
	@Get('refresh-token')
	@HttpCode(200)
	refreshToken(
		@Req() req: Request,
		@UserFromReq() user: User,
	): Promise<authDomain.AuthToken> {
		return this.authService.refreshToken(
			user,
			requestIP.getClientIp(req) || req.ip,
		);
	}
}
