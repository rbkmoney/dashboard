import { Option } from '@dsh/app/shared/components/inputs/autocomplete-input';
import { Wallet } from '@dsh/api-codegen/wallet-api';

export function walletsToOptions(wallets: Wallet[]): Option[] {
    return wallets.map(wallet => ({ label: wallet.name, value: wallet.id }));
}