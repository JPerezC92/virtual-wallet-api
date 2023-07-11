import { IMovementBase } from './MovementBase.interface';

export interface IMovementEdition<T> {
	changeConcept(concept: Pick<IMovementBase, 'concept' | 'date'>): T;
}
