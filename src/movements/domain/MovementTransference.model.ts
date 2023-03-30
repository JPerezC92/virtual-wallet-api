import * as crypto from 'crypto';

import { IMovementValidation } from './MovementValidation.interface';
import { ITransference } from './Transference.interface';
import { ITransferenceCreate } from './TransferenceCreate.interface';

export class MovementTransference
	implements ITransference, IMovementValidation
{
	concept: string;
	amount: number;
	type: 'TRANSFERENCE';
	date: Date;
	createdAt: Date;
	updatedAt: Date;
	toAccountId: string;
	accountId: string;
	id: string;
	currency: string;

	constructor(props: ITransference) {
		this.id = props.id;
		this.toAccountId = props.toAccountId;
		this.accountId = props.accountId;
		this.concept = props.concept;
		this.amount = props.amount;
		this.type = props.type;
		this.date = props.date;
		this.currency = props.currency;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	static createNew(newTransference: ITransferenceCreate) {
		return new MovementTransference({
			...newTransference,
			id: crypto.randomUUID(),
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}

	isInstance(other: unknown): other is this {
		return other instanceof MovementTransference;
	}
}
