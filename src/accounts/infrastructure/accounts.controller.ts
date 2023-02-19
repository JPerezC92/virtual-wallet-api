import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserFromReq } from '@/Auth/infrastructure/decorators';
import { AccessJwtAuthGuard } from '@/Auth/infrastructure/service';
import { User } from '@/Users/domain';

@ApiTags('accounts')
@Controller('accounts')
@UsePipes(ZodValidationPipe)
export class AccountsController {
	@ApiBearerAuth()
	@UseGuards(AccessJwtAuthGuard)
	@Post()
	create(@UserFromReq() user: User) {
		return user;
	}
}
