import { NavbarItemConfig } from '@dsh/app/shared/components/route-navbar';

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
        icon: 'wallet_menu',
        label: wallets,
    },
    {
        routerLink: './deposits',
        icon: 'input',
        label: deposits,
    },
    {
        routerLink: './withdrawals',
        icon: 'output',
        label: withdrawals,
    },
    {
        routerLink: './integrations',
        icon: 'build',
        label: integrations,
    },
];
