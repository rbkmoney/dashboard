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
        icon: 'pie_chart',
        label: analytics,
    },
    {
        routerLink: 'operations',
        icon: 'table_chart',
        label: operations,
    },
    {
        routerLink: 'payouts',
        icon: 'output',
        label: payouts,
    },
    {
        routerLink: 'reports',
        icon: 'description',
        label: reports,
    },
    {
        routerLink: 'integrations',
        icon: 'build',
        label: integrations,
    },
];