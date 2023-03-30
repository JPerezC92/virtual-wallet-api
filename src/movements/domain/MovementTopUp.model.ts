import * as crypto from 'crypto';

import { IMovementBase } from './MovementBase.interface';
import { IMovementEdition } from './MovementEdition.interface';
import { IMovementValidation } from './MovementValidation.interface';
import { ITopupCreate } from './TopupCreate.interface';

export class MovementTopUp
	implements IMovementBase, IMovementEdition, IMovementValidation
{
	concept: string;
	amount: number;
	type: 'TOPUP';
	date: Date;
	createdAt: Date;
	updatedAt: Date;
	accountId: string;
	id: string;
	currency: string;

	constructor(props: IMovementBase) {
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

	static createNew(props: ITopupCreate): MovementTopUp {
		return new MovementTopUp({
			...props,
			id: crypto.randomUUID(),
			createdAt: new Date(),
			updatedAt: new Date(),
			currency: '',
		});
	}

	changeConcept(concept: MovementTopUp['concept']): void {
		this.concept = concept;
	}

	isInstance(other: unknown): other is this {
		return other instanceof MovementTopUp;
	}
}
