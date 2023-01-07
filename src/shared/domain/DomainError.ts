export abstract class DomainError extends Error {
	public abstract readonly code: string;
	public abstract readonly name: string;
	public abstract readonly message: string;

	public static isDomainError(error: unknown): error is DomainError {
		return error instanceof DomainError;
	}
}
