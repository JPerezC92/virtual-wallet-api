import { StatusCodes } from "http-status-codes";

import {
  JsendStatus,
  JsendSuccess,
} from "../../../../shared/infrastructure/endpointResponse/Jsend";
import { RequestSuccess } from "../../../../shared/infrastructure/endpointResponse/RequestSuccess";
import { Movement } from "../../../domain/Movement";
import { MovementEndpointDto } from "../../dto/MovementEndpoint.dto";
import { MovementDomainToEndpoint } from "../../mappers/MovementDomainToEndpoint";

export class MovementIdGetResponse implements RequestSuccess {
  status: JsendStatus.success;
  statusCode: number;
  data: MovementEndpointDto;

  constructor(movement: Movement) {
    this.status = JsendStatus.success;
    this.statusCode = StatusCodes.OK;
    this.data = MovementDomainToEndpoint(movement);
  }

  public json(): JsendSuccess<this["data"]> {
    return { status: this.status, data: this.data };
  }
}
