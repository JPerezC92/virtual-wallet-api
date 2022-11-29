import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { JsendError, JsendFail, JsendStatus } from "../endpointResponse/Jsend";
import { RequestError } from "../endpointResponse/RequestError";

export class Conflict implements RequestError {
	message: string;
	status: JsendStatus.fail | JsendStatus.error;
	statusCode: number;

	constructor(message?: string) {
		this.message = message || ReasonPhrases.CONFLICT;
		this.status = JsendStatus.error;
		this.statusCode = StatusCodes.CONFLICT;
	}

	json(): JsendFail | JsendError {
		return {
			status: this.status,
			message: this.message,
		};
	}
}
