import { Movement } from '@/Movements/domain/Movement.model';

export interface MovementsRepository {
	create(movement: Movement): Promise<void>;
}
