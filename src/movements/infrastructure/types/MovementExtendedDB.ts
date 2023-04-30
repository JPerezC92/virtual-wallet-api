import { AccountDB, MovementDB } from '@prisma/client';

export type MovementExtendedDB = MovementDB & {
	isTransferenceReceived?: boolean;
	account: AccountDB;
	toAccount: AccountDB | null;
};
