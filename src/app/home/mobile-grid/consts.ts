import { InjectionToken } from '@angular/core';

import { NavigationSections } from '../navigation';
import { PartialNavigationNode } from './types/partial-navigation-node';

export const ROOT_NODE_LEVEL = 0;

export const MOBILE_MENU_TOKEN = new InjectionToken<PartialNavigationNode[]>('mobile-menu-token');

export const MOBILE_MENU: PartialNavigationNode[] = [
    {
        id: NavigationSections.main,
    },
    {
        id: 'payments_folder',
        children: [
            {
                id: NavigationSections.paymentsAnalytics,
                icon: 'pie_chart',
            },
            {
                id: NavigationSections.paymentsOperations,
                icon: 'table_chart',
            },
            {
                id: NavigationSections.paymentsPayouts,
                icon: 'output',
            },
            {
                id: NavigationSections.paymentsReports,
                icon: 'description',
            },
            {
                id: NavigationSections.paymentsIntegrations,
                icon: 'build',
            },
        ],
    },
    {
        id: 'wallets_folder',
        children: [
            {
                id: NavigationSections.walletsWallet,
                icon: 'wallet_menu',
            },
            {
                id: NavigationSections.wallets,
                icon: 'wallet_menu',
            },
            {
                id: NavigationSections.walletsDeposits,
                icon: 'input',
            },
            {
                id: NavigationSections.walletsWithdrawals,
                icon: 'output',
            },
            {
                id: NavigationSections.walletsIntegrations,
                icon: 'build',
            },
        ],
    },
    {
        id: NavigationSections.claims,
    },
];
