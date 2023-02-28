import * as crypto from 'crypto';

import { Account } from '@/Accounts/domain';

import { MovementType } from './MovementType';

export interface MovementProps<Type extends MovementType = 'TOPUP'> {
	id: string;
	concept: string;
	amount: number;
	type: Type;

	accountId: Account['id'];
	date: Date;
	createdAt: Date;
	updatedAt: Date;
}

interface MovementEditable {
	changeConcept(concept: MovementProps['concept']): void;
}
interface MovementValidator {
	isInstance(other: unknown): other is this;
}

type TopupProps = MovementProps & MovementEditable & MovementValidator;
export type TopupNewProps = Omit<
	MovementProps<'TOPUP'>,
	'id' | 'createdAt' | 'updatedAt'
>;

export class MovementTopUp implements TopupProps {
	concept: string;
	amount: number;
	type: 'TOPUP';
	date: Date;
	createdAt: Date;
	updatedAt: Date;
	accountId: string;
	id: string;

	constructor(props: MovementProps) {
		this.id = props.id;
		this.accountId = props.accountId;
		this.concept = props.concept;
		this.amount = props.amount;
		this.type = props.type;
		this.date = props.date;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	static createNew(props: TopupNewProps): MovementTopUp {
		return new MovementTopUp({
			...props,
			id: crypto.randomUUID(),
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}

	changeConcept(concept: MovementTopUp['concept']): void {
		this.concept = concept;
	}

	isInstance(other: unknown): other is this {
		return other instanceof MovementTopUp;
	}
}

type PaymentProps = MovementProps<'PAYMENT'> &
	MovementEditable &
	MovementValidator;
export type PaymentNewProps = Omit<
	MovementProps<'PAYMENT'>,
	'id' | 'createdAt' | 'updatedAt'
>;

export class MovementPayment implements PaymentProps {
	concept: string;
	amount: number;
	type: 'PAYMENT';
	date: Date;
	createdAt: Date;
	updatedAt: Date;
	accountId: string;
	id: string;

	constructor(props: MovementProps<'PAYMENT'>) {
		this.id = props.id;
		this.accountId = props.accountId;
		this.concept = props.concept;
		this.amount = props.amount;
		this.type = props.type;
		this.date = props.date;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	static createNew(newPayment: PaymentNewProps) {
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

type TransferenceBaseProps = MovementProps<'TRANSFERENCE'> & {
	toAccountId: string;
};
type TransferenceProps = TransferenceBaseProps & MovementValidator;

export type TransferenceNewProps = Omit<
	TransferenceBaseProps,
	'id' | 'createdAt' | 'updatedAt'
>;

export class MovementTransference implements TransferenceProps {
	concept: string;
	amount: number;
	type: 'TRANSFERENCE';
	date: Date;
	createdAt: Date;
	updatedAt: Date;
	toAccountId: string;
	accountId: string;
	id: string;

	constructor(props: TransferenceBaseProps) {
		this.id = props.id;
		this.toAccountId = props.toAccountId;
		this.accountId = props.accountId;
		this.concept = props.concept;
		this.amount = props.amount;
		this.type = props.type;
		this.date = props.date;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	static createNew(newTransference: TransferenceNewProps) {
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

export type Movement = MovementPayment | MovementTopUp | MovementTransference;
