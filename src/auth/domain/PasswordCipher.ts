export interface PasswordCipher {
	encrypt(plainPassword: string): Promise<string>;
	compare(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
