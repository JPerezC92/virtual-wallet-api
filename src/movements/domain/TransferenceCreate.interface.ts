import { ITransference } from './Transference.interface';

export type ITransferenceCreate = Omit<
	ITransference,
	'id' | 'createdAt' | 'updatedAt' | 'isTransferenceReceived' | 'userId'
>;
