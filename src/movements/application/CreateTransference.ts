import {
	AccountRecieverNotFound,
	AccountsRepository,
	UserIsntOwnerOfAccount,
} from '@/Accounts/domain';
import {
	AccountSenderAndRecieverAreEqual,
	ITransferenceCreate,
	MovementsRepository,
	MovementTransference,
} from '@/Movements/domain';
import { Adapter, UseCase } from '@/Shared/application';
import { User, UsersRepository } from '@/Users/domain';
import { UserNotFound } from '@/Users/domain/UserNotFound.error';

type CreatePaymentProps = {
	user: User;
	newTransference: Omit<
		ITransferenceCreate,
		'currency' | 'isTransferenceReceived'
	>;
};

/**
 * @throws { AccountSenderAndRecieverAreEqual }
 * @throws { UserNotFound }
 * @throws { NotEnoughMoney }
 * @throws { UserIsntOwnerOfAccount }
 * @throws { AccountRecieverNotFound }
 */
export const CreateTransference: <AdapterReturn>(
	accountsRepository: AccountsRepository,
	movementsRepo: MovementsRepository,
	userRepo: UsersRepository,
	outputAdapter: Adapter<MovementTransference, AdapterReturn>,
) => UseCase<Promise<AdapterReturn>, CreatePaymentProps> = (
	accountsRepo,
	movementsRepo,
	usersRepo,
	outputAdapter,
) => {
	return {
		execute: async ({ user, newTransference }) => {
			const _user = await usersRepo.findByUserId(user.id);

			if (newTransference.accountId === newTransference.toAccountId) {
				throw new AccountSenderAndRecieverAreEqual();
			}

			if (!_user) throw new UserNotFound(user.id);

			let accountSender = _user.findAccount(newTransference.accountId);
			let accountReciever = await accountsRepo.findById(
				newTransference.toAccountId,
			);

			if (!accountSender) {
				throw new UserIsntOwnerOfAccount(newTransference.accountId);
			}

			if (!accountReciever) {
				throw new AccountRecieverNotFound();
			}

			const transference = MovementTransference.createNew({
				...newTransference,
				currency: accountSender.currency,
			});
			accountSender = accountSender.sendTransference(transference);
			accountReciever = accountReciever.recieveTransference(transference);

			await Promise.all([
				movementsRepo.create(transference),
				accountsRepo.update(accountSender),
				accountsRepo.update(accountReciever),
			]);

			return outputAdapter(transference);
		},
	};
};
