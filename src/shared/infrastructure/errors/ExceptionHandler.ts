import {
	HttpException as NestHttpException,
	InternalServerErrorException,
} from '@nestjs/common';

import { DomainError } from '@/Shared/domain/DomainError';

import { UnhandledDomainError } from './UnhandledDomainError';

type HttpException = new (
	objectOrError?: any,
	description?: string | undefined,
) => NestHttpException;

export type ExceptionMap = [DomainError['name'], HttpException][];

export function ExceptionHandler(exceptionList: ExceptionMap) {
	const find = (error: unknown): (() => NestHttpException) => {
		const _exceptionList = new Map(exceptionList);

		if (!DomainError.isDomainError(error)) {
			return () => new InternalServerErrorException();
		}

		const Exception = _exceptionList.get(error.name);

		if (!Exception) throw new UnhandledDomainError(error);

		return () =>
			new Exception({
				code: error.code,
				message: error.message,
				statusCode: new Exception().getStatus(),
			});
	};

	return { find };
}
