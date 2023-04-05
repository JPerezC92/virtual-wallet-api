import * as crypto from 'crypto';

import { NotEnoughMoney } from '@/Accounts/domain/NotEnoughMoney.error';
import { CurrenciesRepository } from '@/Currencies/domain';
import {
	MovementPayment,
	MovementTopUp,
	MovementTransference,
} from '@/Movements/domain';
import { User } from '@/Users/domain';

interface AccountProps {
	id: string;
	income: number;
	expense: number;
	userId: string;
	currency: string;
	createdAt: Date;
	updatedAt: Date;
}

export class Account {
	id: string;
	balance: number;
	income: number;
	expense: number;
	userId: string;
	currency: string;
	createdAt: Date;
	updatedAt: Date;

	constructor(props: AccountProps) {
		this.id = props.id;
		this.balance = props.income - props.expense;
		this.income = props.income;
		this.expense = props.expense;
		this.userId = props.userId;
		this.currency = props.currency;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	static createNew(userId: User['id'], currency: string): Account {
		return new Account({
			id: crypto.randomUUID(),
			income: 0,
			expense: 0,
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

	doTopup(topup: MovementTopUp) {
		return new Account({
			...this,

			income: topup.amount + this.income,
		});
	}

	/**
	 * @throws { NotEnoughMoney }
	 */
	doPayment(payment: MovementPayment): Account {
		if (this.balance < payment.amount) throw new NotEnoughMoney();

		return new Account({
			...this,
			expense: payment.amount + this.expense,
		});
	}

	/**
	 * @throws { NotEnoughMoney }
	 */
	sendTransference(transference: MovementTransference): Account {
		if (this.balance < transference.amount) throw new NotEnoughMoney();

		return new Account({
			...this,
			expense: transference.amount + this.expense,
		});
	}

	recieveTransference(transference: MovementTransference): Account {
		return new Account({
			...this,
			income: transference.amount + this.income,
		});
	}
}
