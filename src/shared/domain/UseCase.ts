export interface UseCase<Output, Input = void> {
  execute(input: Input): Output;
}
