import { UseCase } from "../../shared/domain/UseCase";
import { UsersRepository } from "../../users/domain/UsersRepository";
import { AuthAccessPayload } from "../domain/AuthAccessPayload";
import { UserNotFound } from "../domain/UserNotFound";

export const AuthLogout: (props: {
  usersRepository: UsersRepository;
}) => UseCase<Promise<void>, AuthAccessPayload> = ({ usersRepository }) => {
  return {
    execute: async ({ email }) => {
      const user = await usersRepository.findByEmail(email);

      if (!user) throw new UserNotFound();

      user.logout();

      await usersRepository.update(user);
    },
  };
};
