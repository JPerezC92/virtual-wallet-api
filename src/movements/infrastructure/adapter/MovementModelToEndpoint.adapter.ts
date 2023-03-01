import { Movement } from '@/Movements/domain';
import { MovementEndpoint } from '@/Movements/infrastructure/schemas';

export function MovementModelToEndpoint(movement: Movement) {
	return MovementEndpoint.parse(movement);
}
