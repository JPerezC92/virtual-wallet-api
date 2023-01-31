import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { RefreshPayload, TokenCipher } from '@/Auth/domain';
import { EnvVariables } from '@/Shared/infrastructure/utils';

@Injectable()
export class RefreshTokenCipher implements TokenCipher<RefreshPayload> {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService<EnvVariables>,
	) {}
	encode(payload: RefreshPayload): string {
		return this.jwtService.sign(payload, {
			secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
			expiresIn: '3 days',
		});
	}
	decode(token: string): RefreshPayload {
		return this.jwtService.verify<RefreshPayload>(token, {
			secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
		});
	}
}
