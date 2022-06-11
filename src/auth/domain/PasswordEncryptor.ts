export interface PasswordEncryptor {
  encrypt(plainPassword: string): Promise<string>;
  compare(plainPassword: string, hash: string): Promise<boolean>;
}
