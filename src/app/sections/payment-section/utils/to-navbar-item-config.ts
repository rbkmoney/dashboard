import { BootstrapIconName } from '@dsh/components/indicators';

export interface NavbarItemConfig {
    routerLink: string;
    icon: BootstrapIconName;
    label: string;
}

export const toNavbarItemConfig = ({
    shops,
    analytics,
    integrations,
    operations,
    payouts,
    reports,
}: {
    [k: string]: string;
}): NavbarItemConfig[] => [
    {
        routerLink: 'shops',
        icon: BootstrapIconName.Shop,
        label: shops,
    },
    {
        routerLink: 'analytics',
        icon: BootstrapIconName.PieChart,
        label: analytics,
    },
    {
        routerLink: 'operations',
        icon: BootstrapIconName.LayoutTextSidebarReverse,
        label: operations,
    },
    {
        routerLink: 'payouts',
        icon: BootstrapIconName.ArrowRightCircle,
        label: payouts,
    },
    {
        routerLink: 'reports',
        icon: BootstrapIconName.FileText,
        label: reports,
    },
    {
        routerLink: 'integrations',
        icon: BootstrapIconName.Plug,
        label: integrations,
    },
];
