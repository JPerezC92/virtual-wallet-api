export function calculateSkip(props: { page: number; limit: number }) {
	const skip = (props.page - 1) * props.limit;

	if (skip < 0) return 0;

	return skip;
}
