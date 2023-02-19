import * as crypto from 'crypto';

import { CurrencyRepository } from '@/Currency/domain';
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

	public static async createDefault(
		userId: User['id'],
		currencyRepository: CurrencyRepository,
	): Promise<Account> {
		const currency = await currencyRepository.findDefault();
		return new Account({
			id: crypto.randomUUID(),
			money: 0,
			currency,
			userId,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}
}
