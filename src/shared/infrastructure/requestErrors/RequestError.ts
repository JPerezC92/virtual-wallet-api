import { JsendError, JsendFail } from "../endpointResponse";

export interface RequestError {
  json(): JsendFail | JsendError;
}
