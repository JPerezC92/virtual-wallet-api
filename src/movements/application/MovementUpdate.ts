import {
	IMovementBase,
	Movement,
	MovementNotAllowedToEdit,
	MovementNotFound,
	MovementsRepository,
	MovementTransference,
} from '@/Movements/domain';
import { UseCase } from '@/Shared/application';
import { User, UserNotFound, UsersRepository } from '@/Users/domain';

interface MovementUpdateProps {
	userId: User['id'];
	movementUpdate: IMovementBase<'PAYMENT'> | IMovementBase;
}

/**
 * @throws { UserNotFound }
 * @throws { MovementNotFound }
 * @throws { MovementNotAllowedToEdit }
 */
export const MovementUpdate: (
	movementsRepository: MovementsRepository,
	usersRepository: UsersRepository,
) => UseCase<Promise<Movement>, MovementUpdateProps> = (
	movementsRepository,
	usersRepository,
) => {
	return {
		execute: async ({ userId, movementUpdate }) => {
			const user = await usersRepository.findByUserId(userId);

			if (!user) throw new UserNotFound();

			let movement = await movementsRepository.findById(movementUpdate.id);

			if (!movement) throw new MovementNotFound(movementUpdate.id);

			if (MovementTransference.isTransference(movement)) {
				throw new MovementNotAllowedToEdit();
			}

			movement = movement.changeConcept(movementUpdate);

			await movementsRepository.update(movement);

			return movement;
		},
	};
};
