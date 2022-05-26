import { JsendStatus, JsendSuccess } from "./Jsend";

export interface RequestSuccess {
  readonly status: JsendStatus.success;
  readonly statusCode: number;
  data: unknown;
  json(): JsendSuccess<this["data"]>;
}
