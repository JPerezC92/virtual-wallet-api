export abstract class DomainError extends Error {
	abstract readonly name: string;
	abstract readonly message: string;

	public static isDomainError(error: Error): error is DomainError {
		return error instanceof DomainError;
	}
}
