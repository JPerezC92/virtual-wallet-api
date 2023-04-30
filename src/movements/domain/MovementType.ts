export const MovementTypeEnum = [
	'PAYMENT',
	'TOPUP',
	'TRANSFERENCE',
	'ALL',
] as const;
export type MovementTypeEnum = typeof MovementTypeEnum[number];

export const MovementType = MovementTypeEnum.reduce(
	(a, b) => ({ ...a, [b]: b }),
	{} as { [key in typeof MovementTypeEnum[number]]: key },
);

type ValueOf<Obj> = Obj[keyof Obj];

export type MovementType = ValueOf<typeof MovementType>;
