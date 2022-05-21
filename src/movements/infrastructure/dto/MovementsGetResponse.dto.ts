import { StatusCodes } from "http-status-codes";

import {
  JsendStatus,
  JsendSuccess,
} from "../../../shared/infrastructure/endpointResponse";
import { Movement } from "../../domain/Movement";
import { MovementDomainToEndpoint } from "../mappers/MovementDomainToEndpoint";
import { MovementEndpointDto } from "./MovementEndpoint.dto";

export class MovementsGetResponseDTO implements JsendSuccess {
  statusCode: StatusCodes.OK;
  status: JsendStatus.success;
  data: MovementEndpointDto[];

  constructor(result: Movement[]) {
    this.status = JsendStatus.success;
    this.statusCode = StatusCodes.OK;
    this.data = result.map(MovementDomainToEndpoint);
  }
}
