import Bcrypt from "bcrypt";

import { PasswordEncryptor } from "@/Auth/domain";

export const BcryptPasswordEncryptor: () => PasswordEncryptor = () => {
	return {
		compare: async (plainPassword, hash) => {
			return await Bcrypt.compare(plainPassword, hash);
		},

		encrypt: async (plainPassword) => {
			const salt = await Bcrypt.genSalt(10);
			return await Bcrypt.hash(plainPassword, salt);
		},
	};
};
