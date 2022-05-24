import { JsendStatus, JsendSuccess } from "./Jsend";

export interface RequestSuccess {
  readonly status: JsendStatus.success;
  readonly statusCode: number;
  readonly data: unknown;
  json(): JsendSuccess;
}
