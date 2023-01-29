import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	UnprocessableEntityException,
	UsePipes,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiTags,
	ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import * as requestIP from 'request-ip';

import { InvalidCredentials } from '@/Auth/domain';
import { AuthService } from '@/Auth/infrastructure/auth.service';
import * as authSchemas from '@/Auth/infrastructure/schemas';
import * as sharedSchemas from '@/Shared/infrastructure/schemas';

@Controller('auth')
@ApiTags('auth')
@UsePipes(ZodValidationPipe)
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post()
	@ApiCreatedResponse({ type: authSchemas.AuthTokenDto })
	@ApiBadRequestResponse({ type: sharedSchemas.BadRequest })
	@ApiUnprocessableEntityResponse({ type: sharedSchemas.Error })
	registerUser(
		@Req() req: Request,
		@Body() credentialsDto: authSchemas.CredentialsDto,
	): Promise<authSchemas.AuthTokenDto> {
		return this.authService.login(
			credentialsDto,
			requestIP.getClientIp(req) || req.ip,
			[[InvalidCredentials.name, UnprocessableEntityException]],
		);
	}

	@Get('me')
	me() {
		return {};
	}
}
