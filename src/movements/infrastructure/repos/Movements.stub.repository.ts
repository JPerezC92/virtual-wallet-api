/* eslint-disable @typescript-eslint/no-unused-vars */
import { accountStub1 } from '@/Accounts/infrastructure/repos';
import {
	Movement,
	MovementPayment,
	MovementsRepository,
	MovementTopUp,
	MovementTransference,
} from '@/Movements/domain';
import { Pagination } from '@/Shared/domain';

export const movementStub1: MovementTopUp = new MovementTopUp({
	accountId: accountStub1.id,
	amount: 10000,
	concept: 'Test TopUp',
	date: new Date(),
	type: 'TOPUP',
	createdAt: new Date(),
	currency: accountStub1.currency,
	id: '1',
	updatedAt: new Date(),
});

export const movementStub2: MovementPayment = new MovementPayment({
	accountId: accountStub1.id,
	amount: 100,
	concept: 'Test Payment',
	date: new Date(),
	type: 'PAYMENT',
	createdAt: new Date(),
	currency: accountStub1.currency,
	id: '2',
	updatedAt: new Date(),
});

export const movementStub3: MovementTransference = new MovementTransference({
	accountId: accountStub1.id,
	amount: 100,
	concept: 'Test Transference',
	date: new Date(),
	type: 'TRANSFERENCE',
	createdAt: new Date(),
	currency: accountStub1.currency,
	id: '3',
	updatedAt: new Date(),
	isTransferenceReceived: true,
	toAccountId: '2',
});

export const movementListStub: Movement[] = [
	movementStub1,
	movementStub2,
	movementStub3,
];

export function MovementsStubRepository(): MovementsRepository {
	return {
		create: async (movement) => {
			movementListStub.push(movement);
			return;
		},
		findByCriteria: async (accountId, _page, _limit) => {
			const movements = movementListStub.filter(
				(movement) => movement.accountId === accountId,
			);

			const pagination = Pagination.empty();

			return {
				movementList: movements,
				pagination,
			};
		},

		findById: async (movementId) => {
			return movementListStub.find((movement) => movement.id === movementId);
		},

		update: async (movement) => {
			const index = movementListStub.findIndex(
				(movement) => movement.id === movement.id,
			);
			movementListStub[index] = movement;
			return;
		},
	};
}
