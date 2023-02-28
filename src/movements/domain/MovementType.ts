export const MovementType = {
	PAYMENT: 'PAYMENT',
	TOPUP: 'TOPUP',
	TRANSFERENCE: 'TRANSFERENCE',
} as const;

type ValueOf<Obj> = Obj[keyof Obj];

export type MovementType = ValueOf<typeof MovementType>;
