/* eslint-disable @typescript-eslint/no-unused-vars */
import { accountStub1 } from '@/Accounts/infrastructure/repos';
import {
	Movement,
	MovementPayment,
	MovementsRepository,
	MovementTopUp,
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

export const movementListStub: Movement[] = [movementStub1, movementStub2];

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
	};
}
