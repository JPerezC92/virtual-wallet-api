export enum JsendStatus {
  success = "success",
  fail = "fail",
  error = "error",
}

export interface JsendSuccess<Data = null> {
  status: JsendStatus.success;
  data: Data;
}

export interface JsendFail {
  status: JsendStatus.fail;
  message: string;
}

export interface JsendError {
  status: JsendStatus.error;
  message: string;
}
