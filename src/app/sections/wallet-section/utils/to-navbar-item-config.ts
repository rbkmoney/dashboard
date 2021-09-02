export interface NavbarItemConfig {
    routerLink: string;
    icon: string;
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
