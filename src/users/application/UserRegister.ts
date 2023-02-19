import { AccountsRepository } from '@/Accounts/domain';
import { PasswordCipher, UserAlreadyRegistered } from '@/Auth/domain';
import { CurrencyRepository } from '@/Currency/domain';
import { Adapter, UseCase } from '@/Shared/application';
import { User, UsersRepository } from '@/Users/domain';

type UserRegisterInput = Pick<
	User,
	'firstName' | 'lastName' | 'email' | 'password'
>;

/**
 * @throws { UserAlreadyRegistered }
 */
export const UserRegister: <AdapterReturn>(
	accountsRepository: AccountsRepository,
	currencyRepository: CurrencyRepository,
	usersRepository: UsersRepository,
	passwordEncryptor: PasswordCipher,
	outputAdapter: Adapter<User, AdapterReturn>,
) => UseCase<Promise<AdapterReturn>, UserRegisterInput> = (
	_accountsRepository,
	_currencyRepository,
	_usersRepository,
	_passwordEncryptor,
	outputAdapter,
) => {
	return {
		execute: async ({ email, firstName, lastName, password }) => {
			const userAlreadyRegistered = await _usersRepository.findByEmail(email);

			if (userAlreadyRegistered) throw new UserAlreadyRegistered();

			const user = await User.createNew(
				{ firstName, lastName, email, password },
				_accountsRepository,
				_currencyRepository,
				_passwordEncryptor,
			);

			await _usersRepository.register(user);

			return outputAdapter(user);
		},
	};
};
