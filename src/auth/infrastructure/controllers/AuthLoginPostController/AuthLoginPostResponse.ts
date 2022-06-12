import { StatusCodes } from "http-status-codes";

import {
  JsendStatus,
  JsendSuccess,
} from "../../../../shared/infrastructure/endpointResponse/Jsend";
import { RequestSuccess } from "../../../../shared/infrastructure/endpointResponse/RequestSuccess";
import { User } from "../../../../users/domain/User";
import { UserEndpointDto } from "../../dto/AuthLogin.dto";
import { UserDomainToEndpoint } from "../../mappers/UserDomainToEndpoint";

export class AuthLoginPostResponse implements RequestSuccess {
  status: JsendStatus.success;
  statusCode: number;
  data: {
    accessToken: string;
    user: UserEndpointDto;
  };

  constructor(props: { accessToken: string; user: User }) {
    this.status = JsendStatus.success;
    this.statusCode = StatusCodes.OK;
    this.data = {
      accessToken: props.accessToken,
      user: UserDomainToEndpoint(props.user),
    };
  }

  json(): JsendSuccess<this["data"]> {
    return {
      status: this.status,
      data: this.data,
    };
  }
}
