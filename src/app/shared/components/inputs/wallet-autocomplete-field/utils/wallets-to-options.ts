import { Wallet } from '@dsh/api-codegen/wallet-api';
import { Option } from '@dsh/components/form-controls/autocomplete-field';

const shopToOption = (wallet: Wallet): Option<Wallet> => ({
    label: wallet?.name,
    value: wallet,
});

export const walletsToOptions = (wallets: Wallet[]): Option<Wallet>[] => wallets.map(shopToOption);
