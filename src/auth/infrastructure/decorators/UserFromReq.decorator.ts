import {
	BadRequestException,
	createParamDecorator,
	ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

import { User } from '@/Users/domain';

// const validator = z.object({
// 	email: z.string().email(),
// 	tokenId: z.string(),
// });

export const UserFromReq = createParamDecorator(
	(_data: unknown, ctx: ExecutionContext): User => {
		const request = ctx.switchToHttp().getRequest<Request>();

		if (!User.isUser(request.user)) throw new BadRequestException();

		return request.user;
	},
);
