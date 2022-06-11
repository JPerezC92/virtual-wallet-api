import { UseCase } from "../../shared/domain/UseCase";
import { User } from "../../users/domain/User";
import { UsersRepository } from "../../users/domain/UsersRepository";
import { AuthPayload } from "../domain/AuthPayload";
import { AuthRepository } from "../domain/AuthRepository";
import { PasswordEncryptor } from "../domain/PasswordEncryptor";
import { TokenEncoder } from "../domain/TokenEncryptor";
import { UserAlreadyExists } from "../domain/UserAlreadyExists";

type Input = User;

export const AuthRegister: (props: {
  authRepository: AuthRepository;
  passwordEncryptor: PasswordEncryptor;
  tokenEncoder: TokenEncoder<AuthPayload>;
  usersRepository: UsersRepository;
}) => UseCase<Promise<string>, Input> = ({
  authRepository,
  passwordEncryptor,
  tokenEncoder,
  usersRepository,
}) => {
  return {
    execute: async ({ id, firstName, lastName, email, password }) => {
      const user = await usersRepository.findByEmail(email);

      if (user) throw new UserAlreadyExists();

      const passwordEncrypted = await passwordEncryptor.encrypt(password);

      const newUser = new User({
        id,
        firstName,
        lastName,
        email,
        password: passwordEncrypted,
      });

      await authRepository.register(newUser);

      const authPayload: AuthPayload = {
        id: newUser.id,
        email: newUser.email,
      };

      const accessToken = tokenEncoder.encode(authPayload);

      return accessToken;
    },
  };
};
