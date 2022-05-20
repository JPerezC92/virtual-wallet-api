import { Movement } from "../../domain/Movement";
import { MovementEndpointDto } from "../dto/MovementEndpoint.dto";

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
