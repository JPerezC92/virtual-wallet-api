import { JsendError, JsendFail, JsendStatus } from "./Jsend";

export interface RequestError {
  readonly message: string;
  readonly status: JsendStatus.fail | JsendStatus.error;
  readonly statusCode: number;
  json(): JsendFail | JsendError;
}
