import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AccessPayload, TokenCipher } from '@/Auth/domain';

@Injectable()
export class AccessTokenCipher implements TokenCipher<AccessPayload> {
	constructor(private jwtService: JwtService) {}
	encode(payload: AccessPayload): string {
		return this.jwtService.sign(payload);
	}
	decode(token: string): AccessPayload {
		return this.jwtService.verify<AccessPayload>(token);
	}
}
