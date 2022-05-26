import { StatusCodes } from "http-status-codes";

import {
  JsendStatus,
  JsendSuccess,
} from "../../../shared/infrastructure/endpointResponse/Jsend";

export class MovementPostResponseDto implements JsendSuccess {
  status: JsendStatus.success;
  statusCode: StatusCodes.CREATED;
  data: null;

  constructor() {
    this.status = JsendStatus.success;
    this.statusCode = StatusCodes.CREATED;
    this.data = null;
  }
}
