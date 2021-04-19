import { InjectionToken } from '@angular/core';

import { NavigationSections } from '../navigation';
import { PartialNavigationNode } from './types/partial-navigation-node';

export const ROOT_NODE_LEVEL = 0;

export const MOBILE_MENU_TOKEN = new InjectionToken<PartialNavigationNode[]>('mobile-menu-token');

export const MOBILE_MENU: PartialNavigationNode[] = [
    {
        id: NavigationSections.Main,
    },
    {
        id: 'payments_folder',
        children: [
            {
                id: NavigationSections.PaymentsAnalytics,
                icon: 'pie_chart',
            },
            {
                id: NavigationSections.PaymentsOperations,
                icon: 'table_chart',
            },
            {
                id: NavigationSections.PaymentsPayouts,
                icon: 'output',
            },
            {
                id: NavigationSections.PaymentsReports,
                icon: 'description',
            },
            {
                id: NavigationSections.PaymentsIntegrations,
                icon: 'build',
            },
        ],
    },
    {
        id: 'wallets_folder',
        children: [
            {
                id: NavigationSections.WalletsWallet,
                icon: 'wallet_menu',
            },
            {
                id: NavigationSections.Wallets,
                icon: 'wallet_menu',
            },
            {
                id: NavigationSections.WalletsDeposits,
                icon: 'input',
            },
            {
                id: NavigationSections.WalletsWithdrawals,
                icon: 'output',
            },
            {
                id: NavigationSections.WalletsIntegrations,
                icon: 'build',
            },
        ],
    },
    {
        id: NavigationSections.Claims,
    },
];
