export interface NavbarItemConfig {
    routerLink: string;
    icon: string;
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
        icon: 'bi-pie-chart',
        label: analytics,
    },
    {
        routerLink: 'operations',
        icon: 'bi-layout-text-sidebar',
        label: operations,
    },
    {
        routerLink: 'payouts',
        icon: 'bi-arrow-right-circle',
        label: payouts,
    },
    {
        routerLink: 'reports',
        icon: 'bi-file-text',
        label: reports,
    },
    {
        routerLink: 'integrations',
        icon: 'bi-plug',
        label: integrations,
    },
];
