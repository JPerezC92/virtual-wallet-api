import jwt, { JwtPayload } from "jsonwebtoken";

import { environmentVariables } from "../../../shared/infrastructure/EnvironmentVariables";
import { AuthAccessPayload } from "../../domain/AuthAccessPayload";
import { TokenEncoder } from "../../domain/TokenEncryptor";

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
