export interface TokenEncoder<T> {
  encode(payload: T): string;
  decode(token: string): T;
}
