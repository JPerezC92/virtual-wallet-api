import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
	Body,
	Controller,
	Get,
	Post,
	Put,
	Query,
	UseGuards,
	UsePipes,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
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
	@ApiOperation({
		summary: 'Create a new movement',
		description: 'Create a new movement.',
	})
	@UseGuards(AccessJwtAuthGuard)
	@Post()
	createMovement(
		@UserFromReq() user: User,
		@Body() movement: movementsSchemas.MovementDto,
	): Promise<movementsSchemas.Movement> {
		return this.movementsService.createMovement(user, movement);
	}

	@ApiBearerAuth()
	@ApiInternalServerErrorResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiNotFoundResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiBadRequestResponse({ type: sharedSchemas.BadRequest })
	@ApiOkResponse({ type: movementsSchemas.Movement })
	@ApiOperation({
		summary: 'List all the movements',
		description: 'List all the movements for an specific account.',
	})
	@UseGuards(AccessJwtAuthGuard)
	@Get()
	findByCriteria(
		@UserFromReq() user: User,
		@Query() movementGetQueryDto: movementsSchemas.MovementGetQueryDto,
	): Promise<movementsSchemas.MovementGetResponseDto> {
		return this.movementsService.findByCriteria(user, movementGetQueryDto);
	}

	@ApiBearerAuth()
	@ApiBadRequestResponse({ type: sharedSchemas.BadRequest })
	@ApiConflictResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiNotFoundResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiInternalServerErrorResponse({ type: sharedSchemas.ErrorResponseDto })
	@ApiOperation({
		summary: 'Update a movement',
		description: 'Update a movement that belongs to the user.',
	})
	@UseGuards(AccessJwtAuthGuard)
	@Put(':id')
	update(
		@UserFromReq() user: User,
		@Body() movementUpdate: movementsSchemas.MovementUpdate,
	) {
		return this.movementsService.update(movementUpdate, user);
	}
}
