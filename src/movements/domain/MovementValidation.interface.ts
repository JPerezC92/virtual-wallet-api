export interface IMovementValidation {
	isInstance(other: unknown): other is this;
}
