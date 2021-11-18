import { IconName } from 'ngx-bootstrap-icons';

export interface NavbarItemConfig {
    routerLink: string;
    icon: IconName;
    label: string;
}

export const toNavbarItemConfig = ({
    analytics,
    integrations,
    operations,
    payouts,
    reports,
}: {
    [k: string]: string;
}): NavbarItemConfig[] => [
    {
        routerLink: 'analytics',
        icon: 'pie-chart',
        label: analytics,
    },
    {
        routerLink: 'operations',
        icon: 'layout-text-sidebar',
        label: operations,
    },
    {
        routerLink: 'payouts',
        icon: 'arrow-right-circle',
        label: payouts,
    },
    {
        routerLink: 'reports',
        icon: 'file-text',
        label: reports,
    },
    {
        routerLink: 'integrations',
        icon: 'plug',
        label: integrations,
    },
];
