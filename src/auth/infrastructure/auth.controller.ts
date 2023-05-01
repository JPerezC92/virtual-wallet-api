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
	ApiOperation,
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
import { UserModelToEndpoint } from '@/Users/infrastructure/adapters';
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
	@ApiOperation({
		summary: 'Start a session',
		description:
			'Get a JWT access token to authenticate to the system and a refresh token to refresh the session.',
	})
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
	@ApiOperation({
		summary: 'Obtain information of the logged in user',
		description: 'Get the information of the user who started the session.',
	})
	@Get('me')
	me(@UserFromReq() user: User): usersSchemas.User {
		return UserModelToEndpoint(user);
	}

	@ApiOkResponse({ type: authSchemas.AuthToken })
	@ApiHeader({ name: 'x-refresh-token' })
	@ApiUnauthorizedResponse({ type: sharedSchemas.Unauthorized })
	@ApiInternalServerErrorResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiOperation({
		summary: 'Renew the authentication JWT tokens',
		description:
			'Get a new JWT access token and refresh token and invalidate the olders.',
	})
	@Get('refresh-token')
	@UseGuards(RefreshJwtAuthGuard)
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

	@ApiOkResponse()
	@ApiUnauthorizedResponse({ type: sharedSchemas.Unauthorized })
	@ApiInternalServerErrorResponse({ type: sharedSchemas.ErrorResponseDto })
	@UseGuards(RefreshJwtAuthGuard)
	@Post('logout')
	@HttpCode(200)
	logout(@Req() req: Request, @UserFromReq() user: User): Promise<void> {
		return this.authService.logout(user, requestIP.getClientIp(req) || req.ip);
	}
}
