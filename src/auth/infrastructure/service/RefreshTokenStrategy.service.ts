import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as requestIP from 'request-ip';

import { RefreshPayload } from '@/Auth/domain';
import { PrismaService } from '@/Database/prisma.service';
import { EnvVariables } from '@/Shared/infrastructure/utils';
import { User } from '@/Users/domain';
import { UsersPrismaRepository } from '@/Users/infrastructure/repos';

const refreshTokenStrategy = 'RefreshTokenStrategy';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
	Strategy,
	refreshTokenStrategy,
) {
	constructor(
		private prismaService: PrismaService,
		_configService: ConfigService<EnvVariables>,
	) {
		super({
			passReqToCallback: true,
			jwtFromRequest: ExtractJwt.fromHeader('x-refresh-token'),
			ignoreExpiration: false,
			secretOrKey: _configService.get('JWT_REFRESH_TOKEN_SECRET'),
		});
	}

	async validate(req: Request, payload: RefreshPayload): Promise<User> {
		const user = await this.prismaService.$transaction((db) =>
			UsersPrismaRepository(db).findByEmail(payload.email),
		);

		const ip = requestIP.getClientIp(req) || req.ip;

		if (!user || user.tokens[ip] !== payload.tokenId) {
			throw new UnauthorizedException();
		}

		return user;
	}
}

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard(refreshTokenStrategy) {}
