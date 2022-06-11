import { DomainError } from "../domain/DomainError";
import { RequestError } from "./endpointResponse/RequestError";
import { InternalServerError } from "./requestErrors/InternalServerError";

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
