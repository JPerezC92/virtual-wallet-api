import { AccountFindTransferenceDetailsOut } from '@/Accounts/application';
import * as movementsSchemas from '@/Movements/infrastructure/schemas';

export function TransferenceDetailsModelToEndpoint(
	out: AccountFindTransferenceDetailsOut,
) {
	return movementsSchemas.TransferenceDetailsEndpoint.parse({
		userDetails: out.userDetails,
		accountDetails: out.account,
	});
}
