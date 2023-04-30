import * as crypto from 'crypto';

import { Account } from '@/Accounts/domain';

import { IMovementBase } from './MovementBase.interface';
import { IMovementEdition } from './MovementEdition.interface';
import { IMovementValidation } from './MovementValidation.interface';
import { IPaymentCreate } from './PaymentCreate.interface';

export class MovementPayment
	implements IMovementBase<'PAYMENT'>, IMovementEdition, IMovementValidation
{
	concept: string;
	amount: number;
	type: 'PAYMENT';
	date: Date;
	createdAt: Date;
	updatedAt: Date;
	accountId: Account['id'];
	id: string;
	currency: string;

	constructor(props: IMovementBase<'PAYMENT'>) {
		this.id = props.id;
		this.accountId = props.accountId;
		this.concept = props.concept;
		this.amount = props.amount;
		this.type = props.type;
		this.date = props.date;
		this.currency = props.currency;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	static createNew(newPayment: IPaymentCreate) {
		return new MovementPayment({
			...newPayment,
			id: crypto.randomUUID(),
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}

	changeConcept(concept: MovementPayment['concept']): void {
		this.concept = concept;
	}

	isInstance(other: unknown): other is this {
		return other instanceof MovementPayment;
	}
}
