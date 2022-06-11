import jwt from "jsonwebtoken";

import { environmentVariables } from "../../../shared/infrastructure/EnvironmentVariables";
import { AuthPayload } from "../../domain/AuthPayload";
import { TokenEncoder } from "../../domain/TokenEncryptor";

export const AuthTokenEncoder: () => TokenEncoder<AuthPayload> = () => {
  return {
    encode: (payload) => {
      const token = jwt.sign(payload, environmentVariables.JWT_SECRET, {
        expiresIn: "1h",
      });
      return token;
    },
    decode: (token) => {
      const payload = jwt.verify(token, environmentVariables.JWT_SECRET);

      return payload as AuthPayload;
    },
  };
};
