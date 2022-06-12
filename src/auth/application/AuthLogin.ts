import { UseCase } from "../../shared/domain/UseCase";
import { User } from "../../users/domain/User";
import { UsersRepository } from "../../users/domain/UsersRepository";
import { AuthPayload } from "../domain/AuthPayload";
import { InvalidCredentials } from "../domain/InvalidCredentials";
import { PasswordEncryptor } from "../domain/PasswordEncryptor";
import { TokenEncoder } from "../domain/TokenEncryptor";

type Input = Pick<User, "email" | "password">;

interface Output {
  accessToken: string;
  user: User;
}

export const AuthLogin: (props: {
  usersRepository: UsersRepository;
  passwordEncryptor: PasswordEncryptor;
  tokenEncoder: TokenEncoder<AuthPayload>;
}) => UseCase<Promise<Output>, Input> = ({
  passwordEncryptor,
  usersRepository,
  tokenEncoder,
}) => {
  return {
    execute: async ({ email, password }) => {
      const user = await usersRepository.findByEmail(email);

      if (!user) throw new InvalidCredentials();

      const isValidPassword = await passwordEncryptor.compare(
        password,
        user.password
      );

      if (!isValidPassword) throw new InvalidCredentials();

      const accessToken = tokenEncoder.encode({
        email: user.email,
        id: user.id,
      });

      return { accessToken, user };
    },
  };
};
