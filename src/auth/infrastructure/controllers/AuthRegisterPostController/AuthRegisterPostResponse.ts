import { StatusCodes } from "http-status-codes";

import {
  JsendStatus,
  JsendSuccess,
} from "../../../../shared/infrastructure/endpointResponse/Jsend";
import { RequestSuccess } from "../../../../shared/infrastructure/endpointResponse/RequestSuccess";

export class AuthRegisterPostResponse implements RequestSuccess {
  status: JsendStatus.success;
  statusCode: number;
  data: {
    accessToken: string;
  };

  constructor(accessToken: string) {
    this.data = { accessToken };
    this.statusCode = StatusCodes.CREATED;
    this.status = JsendStatus.success;
  }

  public json(): JsendSuccess<this["data"]> {
    return {
      status: this.status,
      data: this.data,
    };
  }
}
