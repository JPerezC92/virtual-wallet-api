import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { JsendFail, JsendStatus } from "../endpointResponse/Jsend";
import { RequestError } from "../endpointResponse/RequestError";

export class BadRequest implements RequestError {
	message: string;
	status: JsendStatus.fail;
	statusCode: number;

	constructor(message?: string) {
		this.message = message || ReasonPhrases.BAD_REQUEST;
		this.status = JsendStatus.fail;
		this.statusCode = StatusCodes.BAD_REQUEST;
	}

	public json(): JsendFail {
		return {
			status: this.status,
			message: this.message,
		};
	}
}
