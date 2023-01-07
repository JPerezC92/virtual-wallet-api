import { Prisma } from '@prisma/client';

export interface Repository<RepositoryType> {
	(db: Prisma.TransactionClient): RepositoryType;
}
