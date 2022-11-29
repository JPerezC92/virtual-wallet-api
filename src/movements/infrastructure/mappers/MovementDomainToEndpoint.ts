import { Movement } from "@/Movements/domain";
import { MovementEndpointDto } from "@/Movements/infrastructure/dto";

export function MovementDomainToEndpoint(
	movement: Movement
): MovementEndpointDto {
	return new MovementEndpointDto({
		id: movement.id,
		concept: movement.concept,
		amount: movement.amount,
		date: movement.date,
		type: movement.type,
	});
}
