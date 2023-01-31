import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AccessPayload } from '@/Auth/domain';
import { PrismaService } from '@/Database/prisma.service';
import { EnvVariables } from '@/Shared/infrastructure/utils';
import { User } from '@/Users/domain';
import { UsersPrismaRepository } from '@/Users/infrastructure/repos';

const accessTokenStrategy = 'AccessTokenStrategy';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(
	Strategy,
	accessTokenStrategy,
) {
	constructor(
		private prismaService: PrismaService,
		configService: ConfigService<EnvVariables>,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_ACCESSS_TOKEN_SECRET'),
		});
	}

	async validate(payload: AccessPayload): Promise<User> {
		const user = await this.prismaService.$transaction((db) =>
			UsersPrismaRepository(db).findByEmail(payload.email),
		);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}

@Injectable()
export class AccessJwtAuthGuard extends AuthGuard(accessTokenStrategy) {}
