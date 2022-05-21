import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { JsendFail, JsendStatus } from "../endpointResponse";
import { RequestError } from "./RequestError";

export class BadRequest implements RequestError {
  readonly message: string;
  readonly status: JsendStatus.fail;
  readonly statusCode: number;

  constructor(message?: string) {
    this.message = message || ReasonPhrases.BAD_REQUEST;
    this.status = JsendStatus.fail;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }

  public json(): JsendFail {
    return {
      status: this.status,
      message: this.message,
    };
  }
}
