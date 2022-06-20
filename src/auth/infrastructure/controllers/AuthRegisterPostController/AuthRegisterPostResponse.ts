import { StatusCodes } from "http-status-codes";

import {
  JsendStatus,
  JsendSuccess,
} from "../../../../shared/infrastructure/endpointResponse/Jsend";
import { RequestSuccess } from "../../../../shared/infrastructure/endpointResponse/RequestSuccess";
import { User } from "../../../../users/domain/User";
import { UserDomainToEndpoint } from "../../../../users/infrastructure/mappers/UserDomainToEndpoint";
import { AccessCredentials } from "../../../domain/AccessCredentials";
import { UserEndpointDto } from "../../dto/UserEndpointDto";

export class AuthRegisterPostResponse implements RequestSuccess {
  status: JsendStatus.success;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
    user: UserEndpointDto;
  };

  constructor(accessCredentials: AccessCredentials & { user: User }) {
    this.data = {
      ...accessCredentials,
      user: UserDomainToEndpoint(accessCredentials.user),
    };
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
