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
