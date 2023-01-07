export interface TokenCipher<T> {
	encode(payload: T): string;

	/**
	 * @throws { AuthTokenInvalid }.
	 */
	decode(token: string): T;
}
