export interface UseCase<Output, Input = never> {
	execute(input: Input): Output;
}
