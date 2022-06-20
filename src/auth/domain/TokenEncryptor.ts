export interface TokenEncoder<T = unknown> {
  encode(payload: T): string;
  decode(token: string): T;
}
