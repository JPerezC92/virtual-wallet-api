import * as crypto from 'crypto';

import {
	AccessPayload,
	AuthToken,
	PasswordCipher,
	RefreshPayload,
	TokenCipher,
} from '@/Auth/domain';
import { User } from '@/Users/domain';

export class Credentials {
	readonly email: string;
	readonly password: string;

	constructor(parameters: { email: string; password: string }) {
		this.email = parameters.email;
		this.password = parameters.password;
	}

	async passwordMatches(user: User, pc: PasswordCipher): Promise<boolean> {
		return await pc.compare(this.password, user.password);
	}

	authenticate(
		user: User,
		AccessTokenCipher: TokenCipher<AccessPayload>,
		RefreshTokenCipher: TokenCipher<RefreshPayload>,
	): AuthToken {
		return {
			accessToken: AccessTokenCipher.encode({
				email: user.email,
				userId: user.id,
			}),
			refreshToken: RefreshTokenCipher.encode({
				email: user.email,
				tokenId: crypto.randomUUID(),
			}),
		};
	}
}
