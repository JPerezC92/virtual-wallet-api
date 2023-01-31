import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AccessPayload, TokenCipher } from '@/Auth/domain';
import { EnvVariables } from '@/Shared/infrastructure/utils';

@Injectable()
export class AccessTokenCipher implements TokenCipher<AccessPayload> {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService<EnvVariables>,
	) {}
	encode(payload: AccessPayload): string {
		return this.jwtService.sign(payload, {
			secret: this.configService.get('JWT_ACCESSS_TOKEN_SECRET'),
			expiresIn: '10h',
		});
	}
	decode(token: string): AccessPayload {
		return this.jwtService.verify<AccessPayload>(token, {
			secret: this.configService.get('JWT_ACCESSS_TOKEN_SECRET'),
		});
	}
}
