import { DomainError } from '@/Shared/domain';

import { ExceptionHandler } from './ExceptionHandler';

export class UnhandledDomainError extends Error {
	readonly code = 'UNHANDLED_DOMAIN_ERROR';
	readonly message = `make sure that you'r handling the domain error on the ${ExceptionHandler.name} function`;
	readonly error: DomainError;

	constructor(error: DomainError) {
		super();
		this.error = error;
	}
}
