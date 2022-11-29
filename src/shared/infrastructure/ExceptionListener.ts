import { DomainError } from "@/Shared/domain";
import { RequestError } from "@/Shared/infrastructure/endpointResponse/RequestError";
import { InternalServerError } from "@/Shared/infrastructure/requestErrors/InternalServerError";

interface RequestErrorClass {
	new (message?: string): RequestError;
}

interface ExceptionMapping {
	[key: string]: RequestErrorClass;
}

export const ExceptionListener = (mapping?: ExceptionMapping) => {
	const exceptions = { ...mapping };

	const onException = (error: Error): RequestError => {
		const exception: RequestErrorClass | undefined = exceptions[error.name];

		if (!DomainError.isDomainError(error) || !exception)
			return new InternalServerError(error?.message);

		return new exception(error.message);
	};

	return { onException };
};
