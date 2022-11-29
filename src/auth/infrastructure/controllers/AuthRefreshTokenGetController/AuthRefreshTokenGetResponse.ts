import { StatusCodes } from "http-status-codes";

import { AccessCredentials } from "@/Auth/domain";
import { UserEndpointDto } from "@/Auth/infrastructure/dto";
import {
	JsendStatus,
	JsendSuccess,
} from "@/Shared/infrastructure/endpointResponse/Jsend";
import { RequestSuccess } from "@/Shared/infrastructure/endpointResponse/RequestSuccess";
import { User } from "@/Users/domain";
import { UserDomainToEndpoint } from "@/Users/infrastructure/mappers/UserDomainToEndpoint";

export class AuthRefreshTokenGetResponse implements RequestSuccess {
	status: JsendStatus.success;
	statusCode: number;
	data: AccessCredentials & { user: UserEndpointDto };

	constructor(data: AccessCredentials & { user: User }) {
		this.status = JsendStatus.success;
		this.statusCode = StatusCodes.OK;
		this.data = {
			accessToken: data.accessToken,
			refreshToken: data.refreshToken,
			user: UserDomainToEndpoint(data.user),
		};
	}

	json(): JsendSuccess<this["data"]> {
		return {
			status: this.status,
			data: this.data,
		};
	}
}
