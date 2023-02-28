import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiTags,
} from '@nestjs/swagger';

import { UserFromReq } from '@/Auth/infrastructure/decorators';
import { AccessJwtAuthGuard } from '@/Auth/infrastructure/service';
import * as movementsSchemas from '@/Movements/infrastructure/schemas';
import { MovementsService } from '@/Movements/infrastructure/services';
import * as sharedSchemas from '@/Shared/infrastructure/schemas';
import { User } from '@/Users/domain';

@Controller('movements')
@ApiTags('movements')
@UsePipes(ZodValidationPipe)
export class MovementsController {
	constructor(readonly movementsService: MovementsService) {}

	@ApiBearerAuth()
	@ApiBadRequestResponse({ type: sharedSchemas.BadRequest })
	@ApiConflictResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiNotFoundResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiInternalServerErrorResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiCreatedResponse({ type: movementsSchemas.Movement })
	@UseGuards(AccessJwtAuthGuard)
	@Post()
	createMovement(
		@UserFromReq() user: User,
		@Body() movement: movementsSchemas.MovementDto,
	): Promise<movementsSchemas.Movement> {
		return this.movementsService.createMovement(user, movement);
	}
}
