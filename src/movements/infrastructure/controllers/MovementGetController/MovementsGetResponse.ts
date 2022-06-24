import { StatusCodes } from "http-status-codes";

import {
  JsendStatus,
  JsendSuccess,
} from "../../../../shared/infrastructure/endpointResponse/Jsend";
import { RequestSuccess } from "../../../../shared/infrastructure/endpointResponse/RequestSuccess";
import { Movement } from "../../../domain/Movement";
import { MovementEndpointDto } from "../../dto/MovementEndpoint.dto";
import { MovementDomainToEndpoint } from "../../mappers/MovementDomainToEndpoint";

interface MovementsGetResponseProps {
  movementList: Movement[];
  pages: number;
}

export class MovementsGetResponse implements RequestSuccess {
  status: JsendStatus.success;
  statusCode: number;
  data: { movementList: MovementEndpointDto[]; pages: number };

  constructor({ movementList, pages }: MovementsGetResponseProps) {
    this.status = JsendStatus.success;
    this.statusCode = StatusCodes.OK;
    this.data = {
      movementList: movementList.map(MovementDomainToEndpoint),
      pages,
    };
  }
  public json(): JsendSuccess<this["data"]> {
    return {
      status: this.status,
      data: this.data,
    };
  }
}
