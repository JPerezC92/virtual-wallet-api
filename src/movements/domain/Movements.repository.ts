import { Account } from '@/Accounts/domain';
import { Movement } from '@/Movements/domain/Movement.interface';

export interface MovementsRepository {
	findAll: (userId: Account['id']) => Promise<Movement[]>;
	create: (movement: Movement) => Promise<void>;
}
