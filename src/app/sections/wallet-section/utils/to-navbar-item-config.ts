import { BootstrapIconName } from '@dsh/components/indicators';

export interface NavbarItemConfig {
    routerLink: string;
    icon: BootstrapIconName;
    label: string;
}

export const toNavbarItemConfig = ({
    wallets,
    deposits,
    withdrawals,
    integrations,
}: {
    [k: string]: string;
}): NavbarItemConfig[] => [
    {
        routerLink: './wallets',
        icon: BootstrapIconName.Wallet2,
        label: wallets,
    },
    {
        routerLink: './deposits',
        icon: BootstrapIconName.ArrowDownRightCircle,
        label: deposits,
    },
    {
        routerLink: './withdrawals',
        icon: BootstrapIconName.ArrowUpRightCircle,
        label: withdrawals,
    },
    {
        routerLink: './integrations',
        icon: BootstrapIconName.Plug,
        label: integrations,
    },
];
