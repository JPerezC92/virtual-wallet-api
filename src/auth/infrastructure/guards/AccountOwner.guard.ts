import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { User } from '@/Users/domain';

@Injectable()
export class AccountOwnerGuard implements CanActivate {
	canActivate(_context: ExecutionContext): boolean {
		const request = _context
			.switchToHttp()
			.getRequest<{ user: User; params: { id: string } }>();
		const user = request.user;
		const userId = request.params.id;

		return user.id === userId;
	}
}
