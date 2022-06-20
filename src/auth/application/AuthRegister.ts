import { UseCase } from "../../shared/domain/UseCase";
import { UuidGenerator } from "../../shared/domain/UuidGenerator";
import { User } from "../../users/domain/User";
import { UsersRepository } from "../../users/domain/UsersRepository";
import { AccessCredentials } from "../domain/AccessCredentials";
import { AuthAccessPayload } from "../domain/AuthAccessPayload";
import { AuthRefreshPayload } from "../domain/AuthRefreshPayload";
import { PasswordEncryptor } from "../domain/PasswordEncryptor";
import { TokenEncoder } from "../domain/TokenEncryptor";
import { UserAlreadyExists } from "../domain/UserAlreadyExists";

type Input = Pick<User, "firstName" | "lastName" | "email" | "password">;

interface Output extends AccessCredentials {
  user: User;
}

export const AuthRegister: (props: {
  passwordEncryptor: PasswordEncryptor;
  tokenAccessEncoder: TokenEncoder<AuthAccessPayload>;
  tokenRefreshEncoder: TokenEncoder<AuthRefreshPayload>;
  usersRepository: UsersRepository;
  uuidGenerator: UuidGenerator;
}) => UseCase<Promise<Output>, Input> = ({
  passwordEncryptor,
  tokenAccessEncoder,
  tokenRefreshEncoder,
  usersRepository,
  uuidGenerator,
}) => {
  return {
    execute: async ({ firstName, lastName, email, password }) => {
      const user = await usersRepository.findByEmail(email);

      if (user) throw new UserAlreadyExists();

      const passwordEncrypted = await passwordEncryptor.encrypt(password);

      const refreshToken = tokenRefreshEncoder.encode({
        id: uuidGenerator.generate(),
        email,
      });

      const newUser = new User({
        id: uuidGenerator.generate(),
        firstName,
        lastName,
        email,
        password: passwordEncrypted,
        refreshToken,
      });

      await usersRepository.persist(newUser);

      const authPayload: AuthAccessPayload = {
        id: newUser.id,
        email: newUser.email,
      };

      const accessToken = tokenAccessEncoder.encode(authPayload);

      return { accessToken, refreshToken, user: newUser };
    },
  };
};
