import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Controller, UsePipes } from '@nestjs/common';

@UsePipes(ZodValidationPipe)
@Controller('auth')
export class AuthController {
	// constructor(private readonly authService: AuthService) {}
	// @Post()
	// @ApiCreatedResponse({ type: usersSchemas.User })
	// @ApiBadRequestResponse({ type: sharedSchemas.BadRequestError })
	// @ApiConflictResponse({ type: sharedSchemas.Error })
	// registerUser(
	// 	@Body() createuserDto: usersSchemas.UserCreateDto,
	// ): Promise<usersSchemas.UserEndpoint> {
	// 	return this.authService.registerUser(createuserDto, [
	// 		[UserAlreadyRegistered.name, ConflictException],
	// 	]);
	// }
}
