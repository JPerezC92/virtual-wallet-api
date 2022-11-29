import { StatusCodes } from "http-status-codes";

import { Movement } from "@/Movements/domain";
import { MovementEndpointDto } from "@/Movements/infrastructure/dto";
import { MovementDomainToEndpoint } from "@/Movements/infrastructure/mappers";
import {
	JsendStatus,
	JsendSuccess,
} from "@/Shared/infrastructure/endpointResponse/Jsend";
import { RequestSuccess } from "@/Shared/infrastructure/endpointResponse/RequestSuccess";

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
