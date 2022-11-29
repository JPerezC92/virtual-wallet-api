import jwt, { JwtPayload } from "jsonwebtoken";

import { AuthAccessPayload, TokenEncoder } from "@/Auth/domain";
import { environmentVariables } from "@/Shared/infrastructure/EnvironmentVariables";

export const AuthAccessTokenEncoder: () => TokenEncoder<AuthAccessPayload> =
	() => {
		return {
			encode: (payload) => {
				const token = jwt.sign(
					{ data: payload },
					environmentVariables.JWT_ACCESSS_TOKEN_SECRET,
					{ expiresIn: "1h" }
				);

				return token;
			},

			decode: (token) => {
				const payload = jwt.verify(
					token,
					environmentVariables.JWT_ACCESSS_TOKEN_SECRET
				) as JwtPayload & { data: AuthAccessPayload };

				return payload.data;
			},
		};
	};
