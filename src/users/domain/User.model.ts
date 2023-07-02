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
import { UserDetails, UserDetailsProps } from '@/Users/domain/UserDetails';

interface UserProps {
	readonly id: string;
	userDetails: UserDetails;
	readonly password: string;
	readonly tokens: Record<string, string>;
	readonly accountList: Account[];
	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export class User implements UserProps {
	readonly id: string;
	userDetails: UserDetails;
	tokens: Record<string, string>;
	readonly password: string;
	readonly accountList: Account[];
	readonly createdAt: Date;
	readonly updatedAt: Date;

	constructor(props: UserProps) {
		this.id = props.id;
		this.userDetails = props.userDetails;
		this.tokens = props.tokens;
		this.password = props.password;
		this.accountList = props.accountList;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	public static async createNew(
		props: Pick<UserProps, 'password'> & UserDetailsProps,
		accountsRepository: AccountsRepository,
		currencyRepository: CurrenciesRepository,
		pc: PasswordCipher,
	) {
		const userId = crypto.randomUUID();
		const account = await Account.createDefault(userId, currencyRepository);
		await accountsRepository.createDefault(account);

		return new User({
			id: userId,
			userDetails: new UserDetails(props),
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
			email: user.userDetails.email,
			tokenId,
		});

		this.tokens = { ...this.tokens, [ip]: tokenId };

		return {
			accessToken: AccessTokenCipher.encode({
				email: user.userDetails.email,
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

	logout(ip: string) {
		this.tokens = Object.fromEntries(
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			Object.entries(this.tokens).filter(([k, _]) => k !== ip),
		);
	}

	public updateUserInfo(userDetails: Partial<UserDetails>): User {
		return new User({
			...this,
			userDetails: this.userDetails.change(userDetails),
			updatedAt: new Date(),
		});
	}

	public async changePassword(
		newPassword: User['password'],
		pc: PasswordCipher,
	) {
		return new User({
			...this,
			password: await pc.encrypt(newPassword),
			updatedAt: new Date(),
		});
	}

	public static isUser(other: unknown): other is User {
		return other instanceof User;
	}
}
