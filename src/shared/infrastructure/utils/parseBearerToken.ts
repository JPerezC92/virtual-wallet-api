export function parseBearerToken(token: string) {
	return token.split(" ")[1];
}
