import { MovementUpdate } from '@/Movements/application';
import {
	MovementNotAllowedToEdit,
	MovementNotFound,
	MovementTopUp,
} from '@/Movements/domain';
import {
	MovementsStubRepository,
	movementStub1,
	movementStub3,
} from '@/Movements/infrastructure/repos';
import { UserNotFound } from '@/Users/domain';
import { UsersStubRepository, userStub1 } from '@/Users/infrastructure/repos';

describe('MovementUpdate use case', () => {
	test('should update a movement successfully', async () => {
		// GIVEN
		const user = userStub1;
		const movement = movementStub1;
		const movementUpdate = { ...movement, concept: 'new concept' };

		// WHEN
		const res = await MovementUpdate(
			MovementsStubRepository(),
			UsersStubRepository(),
		).execute({
			userId: user.id,
			movementUpdate,
		});

		// THEN
		expect(res).toBeInstanceOf(MovementTopUp);
	});

	test('should thrown an UserNotFound error', async () => {
		// GIVEN

		const movement = movementStub1;
		const movementUpdate = { ...movement, concept: 'new concept' };

		// WHEN
		const res = MovementUpdate(
			MovementsStubRepository(),
			UsersStubRepository(),
		).execute({
			userId: 'fake id',
			movementUpdate,
		});

		// THEN
		await expect(res).rejects.toThrow(UserNotFound);
	});

	test('should thrown an MovementNotFound error', async () => {
		// GIVEN
		const user = userStub1;
		const movement = movementStub1;
		const movementUpdate = { ...movement, id: 'fake id' };

		// WHEN
		const res = MovementUpdate(
			MovementsStubRepository(),
			UsersStubRepository(),
		).execute({
			userId: user.id,
			movementUpdate,
		});

		// THEN
		await expect(res).rejects.toThrow(MovementNotFound);
	});

	test('should thrown an MovementNotAllowedToEdit error', async () => {
		// GIVEN
		const user = userStub1;
		const movement = movementStub3;
		const movementUpdate = {
			...movement,
			concept: 'new concept',
		} as unknown as MovementTopUp;

		// WHEN
		const res = MovementUpdate(
			MovementsStubRepository(),
			UsersStubRepository(),
		).execute({
			userId: user.id,
			movementUpdate,
		});

		// THEN
		await expect(res).rejects.toThrow(MovementNotAllowedToEdit);
	});
});
