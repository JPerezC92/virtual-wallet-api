import { IPaginationCriteria } from '@/Shared/domain/PaginationCriteria.interface';

export class Pagination {
	constructor(
		public readonly totalPages: number,
		public readonly page: number,
		public readonly prevPage: number | null,
		public readonly nextPage: number | null,
	) {}

	public static empty() {
		return new Pagination(0, 0, null, null);
	}

	// public static init(: number, page: number, limit: number) {

	calculate(criteria: IPaginationCriteria, rowsCount: number) {
		const { page, limit } = criteria;
		const totalPages = Math.ceil(rowsCount / limit);
		const prevPage = page === 1 ? null : page - 1;
		const nextPage = page === totalPages ? null : page + 1;

		return new Pagination(totalPages, page, prevPage, nextPage);
	}
}
