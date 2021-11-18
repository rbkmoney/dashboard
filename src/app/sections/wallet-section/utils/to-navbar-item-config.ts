import { IconName } from 'ngx-bootstrap-icons';

export interface NavbarItemConfig {
    routerLink: string;
    icon: IconName;
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
        icon: 'wallet2',
        label: wallets,
    },
    {
        routerLink: './deposits',
        icon: 'arrow-down-right-circle',
        label: deposits,
    },
    {
        routerLink: './withdrawals',
        icon: 'arrow-up-right-circle',
        label: withdrawals,
    },
    {
        routerLink: './integrations',
        icon: 'plug',
        label: integrations,
    },
];
