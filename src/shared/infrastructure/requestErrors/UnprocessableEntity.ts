import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { JsendError, JsendFail, JsendStatus } from "../endpointResponse/Jsend";
import { RequestError } from "../endpointResponse/RequestError";

export class UnprocessableEntity implements RequestError {
  message: string;
  status: JsendStatus.fail | JsendStatus.error;
  statusCode: number;

  constructor(message?: string) {
    this.message = message || ReasonPhrases.UNPROCESSABLE_ENTITY;
    this.status = JsendStatus.error;
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }

  json(): JsendFail | JsendError {
    return {
      status: this.status,
      message: this.message,
    };
  }
}
