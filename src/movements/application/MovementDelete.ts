import {
	Movement,
	MovementNotFound,
	MovementsRepository,
} from "@/Movements/domain";
import { UseCase } from "@/Shared/domain";

interface Input {
	movementId: Movement["id"];
	userId: Movement["userId"];
}

export const MovementDelete: (props: {
	movementRepository: MovementsRepository;
}) => UseCase<Promise<void>, Input> = ({ movementRepository }) => {
	return {
		execute: async ({ movementId, userId }) => {
			const movement = await movementRepository.findOne({
				id: movementId,
				userId,
			});

			if (!movement) throw new MovementNotFound();

			await movementRepository.delete(movementId);
		},
	};
};
