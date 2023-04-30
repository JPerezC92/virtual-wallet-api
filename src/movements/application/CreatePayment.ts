import { AccountsRepository, UserIsntOwnerOfAccount } from '@/Accounts/domain';
import { MovementsRepository } from '@/Movements/domain';
import { MovementPayment } from '@/Movements/domain/MovementPayment.model';
import { IPaymentCreate } from '@/Movements/domain/PaymentCreate.interface';
import { Adapter, UseCase } from '@/Shared/application';
import { User, UsersRepository } from '@/Users/domain';
import { UserNotFound } from '@/Users/domain/UserNotFound.error';

type CreatePaymentProps = {
	user: User;
	newPayment: Omit<IPaymentCreate, 'currency' | 'userId'>;
};

/**
 * @throws { NotEnoughMoney }
 * @throws { UserNotFound }
 * @throws { UserIsntOwnerOfAccount }
 */
export const CreatePayment: <AdapterReturn>(
	accountsRepository: AccountsRepository,
	movementsRepo: MovementsRepository,
	userRepo: UsersRepository,
	outputAdapter: Adapter<MovementPayment, AdapterReturn>,
) => UseCase<Promise<AdapterReturn>, CreatePaymentProps> = (
	accountsRepo,
	movementsRepo,
	usersRepo,
	outputAdapter,
) => {
	return {
		execute: async ({ user, newPayment }) => {
			const _user = await usersRepo.findByUserId(user.id);

			if (!_user) throw new UserNotFound(user.id);

			let account = _user.findAccount(newPayment.accountId);

			if (!account) {
				throw new UserIsntOwnerOfAccount(newPayment.accountId);
			}

			const payment = MovementPayment.createNew({
				...newPayment,
				currency: account.currency,
			});

			account = account.doPayment(payment);

			await Promise.all([
				movementsRepo.create(payment),
				accountsRepo.update(account),
			]);

			return outputAdapter(payment);
		},
	};
};
