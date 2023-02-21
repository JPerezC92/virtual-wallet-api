import { Account, AccountsRepository } from '@/Accounts/domain';
import { CurrenciesRepository, CurrencyNotFound } from '@/Currencies/domain';
import { Adapter, UseCase } from '@/Shared/application';
import { User, UsersRepository } from '@/Users/domain';
import { UserNotFound } from '@/Users/domain/UserNotFound.error';

interface AccountCreateProps {
	currency: string;
	user: User;
}

/**
 * @throws { UserNotFound }
 * @throws { CurrencyNotFound }
 */
export const AccountCreate: <AdapterResult>(
	accountsRepository: AccountsRepository,
	currencyRepository: CurrenciesRepository,
	usersRepository: UsersRepository,
	outputAdapter: Adapter<Account, AdapterResult>,
) => UseCase<Promise<AdapterResult>, AccountCreateProps> = (
	accountsRepository,
	currencyRepository,
	usersRepository,
	outputAdapter,
) => {
	return {
		execute: async ({ currency, user }) => {
			const [_user, _currency] = await Promise.all([
				usersRepository.findByUserId(user.id),
				currencyRepository.findByValue(currency),
			]);

			if (!_user) throw new UserNotFound(user.id);
			if (!_currency) throw new CurrencyNotFound(currency);

			const account = Account.createNew(_user.id, _currency);
			await accountsRepository.create(account, _user);
			return outputAdapter(account);
		},
	};
};
