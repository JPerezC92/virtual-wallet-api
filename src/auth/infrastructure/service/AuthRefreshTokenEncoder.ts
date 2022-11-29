import jwt, { JwtPayload } from "jsonwebtoken";

import { AuthRefreshPayload, TokenEncoder } from "@/Auth/domain";
import { environmentVariables } from "@/Shared/infrastructure/EnvironmentVariables";

export const AuthRefreshTokenEncoder: () => TokenEncoder<AuthRefreshPayload> =
	() => {
		return {
			encode: (payload) => {
				const token = jwt.sign(
					{ data: payload },
					environmentVariables.JWT_REFRESH_TOKEN_SECRET,
					{ expiresIn: "24h" }
				);

				return token;
			},

			decode: (token) => {
				const payload = jwt.verify(
					token,
					environmentVariables.JWT_REFRESH_TOKEN_SECRET
				) as JwtPayload & { data: AuthRefreshPayload };

				return payload.data;
			},
		};
	};
