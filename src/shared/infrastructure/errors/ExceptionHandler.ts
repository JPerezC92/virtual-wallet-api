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
			console.log(error);
			return () =>
				new InternalServerErrorException({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Something went wrong check the server logs',
					statusCode: 500,
				});
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
