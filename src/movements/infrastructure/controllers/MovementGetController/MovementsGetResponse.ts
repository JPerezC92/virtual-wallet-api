import { StatusCodes } from "http-status-codes";

import { Movement } from "@/Movements/domain";
import { MovementEndpointDto } from "@/Movements/infrastructure/dto";
import { MovementDomainToEndpoint } from "@/Movements/infrastructure/mappers";
import {
	JsendStatus,
	JsendSuccess,
} from "@/Shared/infrastructure/endpointResponse/Jsend";
import { RequestSuccess } from "@/Shared/infrastructure/endpointResponse/RequestSuccess";

interface MovementsGetResponseProps {
	movementList: Movement[];
	pages: number;
}

export class MovementsGetResponse implements RequestSuccess {
	status: JsendStatus.success;
	statusCode: number;
	data: { movementList: MovementEndpointDto[]; pages: number };

	constructor({ movementList, pages }: MovementsGetResponseProps) {
		this.status = JsendStatus.success;
		this.statusCode = StatusCodes.OK;
		this.data = {
			movementList: movementList.map(MovementDomainToEndpoint),
			pages,
		};
	}
	public json(): JsendSuccess<this["data"]> {
		return {
			status: this.status,
			data: this.data,
		};
	}
}
