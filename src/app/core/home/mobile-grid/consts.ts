import { NavigationSections } from '../navigation';
import { PartialNavigationNode } from './types/partial-navigation-node';

export const ROOT_NODE_LEVEL = 0;

export const MOBILE_MENU: PartialNavigationNode[] = [
    {
        id: NavigationSections.main,
    },
    {
        id: NavigationSections.payments,
        children: [
            {
                id: NavigationSections.analytics,
                icon: 'pie_chart',
            },
            {
                id: NavigationSections.operations,
                icon: 'table_chart',
            },
            {
                id: NavigationSections.payouts,
                icon: 'output',
            },
            {
                id: NavigationSections.reports,
                icon: 'description',
            },
            {
                id: NavigationSections.integrations,
                icon: 'build',
            },
        ],
    },
    {
        id: NavigationSections.wallets,
    },
    {
        id: NavigationSections.claims,
    },
];
