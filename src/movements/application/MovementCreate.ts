import { Movement, MovementsRepository } from "@/Movements/domain";
import { UseCase } from "@/Shared/domain";
import { User } from "@/Users/domain";

interface Input extends Pick<Movement, "concept" | "amount" | "type" | "date"> {
	movementId: Movement["id"];
	userId: User["id"];
}

export const MovementCreate: (props: {
	movementsRepository: MovementsRepository;
}) => UseCase<Promise<void>, Input> = ({ movementsRepository }) => {
	return {
		execute: async ({ movementId, amount, concept, type, date, userId }) => {
			const movement = Movement.createNew({
				id: movementId,
				amount,
				concept,
				date,
				type,
				userId,
			});

			await movementsRepository.persist(movement);
		},
	};
};
