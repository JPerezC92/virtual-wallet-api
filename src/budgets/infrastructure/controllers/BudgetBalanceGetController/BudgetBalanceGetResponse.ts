import { StatusCodes } from "http-status-codes";

import {
	JsendStatus,
	JsendSuccess,
} from "@/Shared/infrastructure/endpointResponse/Jsend";
import { RequestSuccess } from "@/Shared/infrastructure/endpointResponse/RequestSuccess";

export class BudgetBalanceGetResponse implements RequestSuccess {
	status: JsendStatus.success;
	statusCode: number;
	data: unknown;

	constructor(balance: number) {
		this.status = JsendStatus.success;
		this.statusCode = StatusCodes.OK;
		this.data = {
			balance,
		};
	}
	json(): JsendSuccess<this["data"]> {
		return { status: this.status, data: this.data };
	}
}
