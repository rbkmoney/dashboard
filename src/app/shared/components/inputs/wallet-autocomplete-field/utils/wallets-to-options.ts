import { Wallet } from '@dsh/api-codegen/wallet-api';
import { Option } from '@dsh/components/form-controls/select-search-field';

const walletToOption = (wallet: Wallet): Option<string> => ({
    label: `${wallet?.id} - ${wallet?.name}`,
    value: wallet?.id,
});

export const walletsToOptions = (wallets: Wallet[]): Option<string>[] => wallets.map(walletToOption);
