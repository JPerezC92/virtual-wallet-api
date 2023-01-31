import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import * as authSchemas from '@/Auth/infrastructure/schemas';

export const AccessPayload = createParamDecorator(
	(_data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		return authSchemas.accessPayloadZ.parse(request.user);
	},
);
