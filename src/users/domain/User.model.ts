import * as crypto from 'crypto';

import { Account, AccountsRepository } from '@/Accounts/domain';
import {
	AccessPayload,
	AuthToken,
	PasswordCipher,
	RefreshPayload,
	TokenCipher,
} from '@/Auth/domain';
import { CurrenciesRepository } from '@/Currencies/domain';

interface UserProps {
	readonly id: string;
	readonly firstName: string;
	readonly lastName: string;
	readonly email: string;
	readonly password: string;
	readonly tokens: Record<string, string>;
	readonly accountList: Account[];
	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export class User implements UserProps {
	readonly id: string;
	readonly firstName: string;
	readonly lastName: string;
	readonly email: string;
	tokens: Record<string, string>;
	readonly password: string;
	readonly accountList: Account[];
	readonly createdAt: Date;
	readonly updatedAt: Date;

	constructor(props: UserProps) {
		this.id = props.id;
		this.firstName = props.firstName;
		this.lastName = props.lastName;
		this.email = props.email;
		this.tokens = props.tokens;
		this.password = props.password;
		this.accountList = props.accountList;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	public static async createNew(
		props: Omit<
			UserProps,
			| 'id'
			| 'createdAt'
			| 'updatedAt'
			| 'accountList'
			| 'tokens'
			| 'accountIdList'
		>,
		accountsRepository: AccountsRepository,
		currencyRepository: CurrenciesRepository,
		pc: PasswordCipher,
	) {
		const userId = crypto.randomUUID();
		const account = await Account.createDefault(userId, currencyRepository);
		await accountsRepository.createDefault(account);

		return new User({
			id: userId,
			firstName: props.firstName,
			lastName: props.lastName,
			email: props.email,
			tokens: {},
			password: await pc.encrypt(props.password),
			createdAt: new Date(),
			updatedAt: new Date(),
			accountList: [account],
		});
	}

	public authenticate(
		user: User,
		ip: string,
		AccessTokenCipher: TokenCipher<AccessPayload>,
		RefreshTokenCipher: TokenCipher<RefreshPayload>,
	): AuthToken {
		const tokenId = crypto.randomUUID();
		const refreshToken = RefreshTokenCipher.encode({
			email: user.email,
			tokenId,
		});

		this.tokens = { ...this.tokens, [ip]: tokenId };

		return {
			accessToken: AccessTokenCipher.encode({
				email: user.email,
				userId: user.id,
			}),
			refreshToken,
		};
	}

	findAccount(accountId: Account['id']) {
		return this.accountList.find((v) => v.id === accountId);
	}

	findAccountByCurrency(currency: Account['currency']) {
		return this.accountList.find((v) => v.currency === currency);
	}

	public static isUser(other: unknown): other is User {
		return other instanceof User;
	}
}
