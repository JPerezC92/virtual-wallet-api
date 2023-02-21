import * as crypto from 'crypto';

import { CurrenciesRepository } from '@/Currencies/domain';
import { User } from '@/Users/domain';

interface AccountProps {
	id: string;
	money: number;
	userId: string;
	currency: string;
	createdAt: Date;
	updatedAt: Date;
}

export class Account {
	id: string;
	money: number;
	userId: string;
	currency: string;
	createdAt: Date;
	updatedAt: Date;

	constructor(props: AccountProps) {
		this.id = props.id;
		this.money = props.money;
		this.userId = props.userId;
		this.currency = props.currency;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	static createNew(userId: User['id'], currency: string): Account {
		return new Account({
			id: crypto.randomUUID(),
			money: 0,
			currency,
			userId,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}

	public static async createDefault(
		userId: User['id'],
		currencyRepository: CurrenciesRepository,
	): Promise<Account> {
		const currency = await currencyRepository.findDefault();
		return Account.createNew(userId, currency);
	}
}
