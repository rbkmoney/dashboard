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
        icon: 'bi-wallet2',
        label: wallets,
    },
    {
        routerLink: './deposits',
        icon: 'bi-arrow-down-right-circle',
        label: deposits,
    },
    {
        routerLink: './withdrawals',
        icon: 'bi-arrow-up-right-circle',
        label: withdrawals,
    },
    {
        routerLink: './integrations',
        icon: 'bi-plug',
        label: integrations,
    },
];
