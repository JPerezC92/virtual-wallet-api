import { Injectable } from '@nestjs/common';
import * as Bcrypt from 'bcrypt';

import { PasswordCipher } from '@/Auth/domain';

@Injectable()
export class BcryptPasswordCipher implements PasswordCipher {
	private rounds = 10;

	async encrypt(plainPassword: string): Promise<string> {
		const salt = await Bcrypt.genSalt(this.rounds);
		return Bcrypt.hash(plainPassword, salt);
	}

	async compare(
		plainPassword: string,
		hashedPassword: string,
	): Promise<boolean> {
		return Bcrypt.compare(plainPassword, hashedPassword);
	}
}
