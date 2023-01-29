import * as crypto from 'crypto';

import { PasswordCipher } from '@/Auth/domain';

interface UserProps {
	readonly id: string;
	readonly firstName: string;
	readonly lastName: string;
	readonly email: string;
	readonly password: string;
	readonly tokens: Record<string, string>;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export class User implements UserProps {
	readonly id: string;
	readonly firstName: string;
	readonly lastName: string;
	readonly email: string;
	readonly tokens: Record<string, string>;
	readonly password: string;
	// readonly accountList: Account[];
	readonly createdAt: Date;
	readonly updatedAt: Date;

	constructor(props: UserProps) {
		this.id = props.id;
		this.firstName = props.firstName;
		this.lastName = props.lastName;
		this.email = props.email;
		this.tokens = props.tokens;
		this.password = props.password;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	public static async createNew(
		props: Omit<
			UserProps,
			'id' | 'createdAt' | 'updatedAt' | 'accountList' | 'tokens'
		>,
		pc: PasswordCipher,
	) {
		const userId = crypto.randomUUID();

		return new User({
			id: userId,
			firstName: props.firstName,
			lastName: props.lastName,
			email: props.email,
			tokens: {},
			password: await pc.encrypt(props.password),
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}
}
