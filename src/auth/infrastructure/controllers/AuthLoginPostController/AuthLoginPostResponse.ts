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

export class AuthLoginPostResponse implements RequestSuccess {
	status: JsendStatus.success;
	statusCode: number;
	data: AccessCredentials & { user: UserEndpointDto };

	constructor(props: AccessCredentials & { user: User }) {
		this.status = JsendStatus.success;
		this.statusCode = StatusCodes.OK;
		this.data = {
			accessToken: props.accessToken,
			refreshToken: props.refreshToken,
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
