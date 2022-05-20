export enum JsendStatus {
  success = "success",
  fail = "fail",
  error = "error",
}

export interface JsendSuccess {
  status: JsendStatus.success;
  data: unknown;
}

export interface JsendFail {
  status: JsendStatus.fail;
  message: string;
}

export interface JsendError {
  status: JsendStatus.error;
  message: string;
}
