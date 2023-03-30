import { IMovementBase } from './MovementBase.interface';

export interface IMovementEdition {
	changeConcept(concept: IMovementBase['concept']): void;
}
