import { StatusCodes } from "http-status-codes";

import {
	JsendStatus,
	JsendSuccess,
} from "@/Shared/infrastructure/endpointResponse/Jsend";
import { RequestSuccess } from "@/Shared/infrastructure/endpointResponse/RequestSuccess";

export class MovementPutResponse implements RequestSuccess {
	status: JsendStatus.success;
	statusCode: number;
	data: null;

	constructor() {
		this.status = JsendStatus.success;
		this.statusCode = StatusCodes.OK;
		this.data = null;
	}

	public json(): JsendSuccess<this["data"]> {
		return {
			status: this.status,
			data: this.data,
		};
	}
}
