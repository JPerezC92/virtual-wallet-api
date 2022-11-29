import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { JsendError, JsendFail, JsendStatus } from "../endpointResponse/Jsend";
import { RequestError } from "../endpointResponse/RequestError";

export class InternalServerError implements RequestError {
	message: string;
	status: JsendStatus.fail | JsendStatus.error;
	statusCode: number;

	constructor(message?: string) {
		this.message = message || ReasonPhrases.INTERNAL_SERVER_ERROR;
		this.status = JsendStatus.error;
		this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
	}

	json(): JsendFail | JsendError {
		return {
			status: this.status,
			message: this.message,
		};
	}
}
