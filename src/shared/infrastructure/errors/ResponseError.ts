export interface MyResponse {
	code: string;
	message: string;
}

export abstract class ResponseError {
	abstract readonly statusCode: number;

	constructor(readonly code: string, readonly message: string) {}

	public abstract response(): MyResponse;
}
