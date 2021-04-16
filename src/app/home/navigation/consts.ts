import { InjectionToken } from '@angular/core';

import { NavigationLink } from './types/navigation-link';
import { NavigationSections } from './types/navigation-sections';

export const ROOT_ROUTE_PATH = '/';

export const REALM_SEGMENT = 'realm';
export const REALM_TYPE = 'REALM_TYPE';

export const PAGE_POSITION_INDEX = 0;
export const SECTION_POSITION_INDEX = 1;
export const SUBSECTION_POSITION_INDEX = 2;
export const REALM_POSITION_INDEX = 1;
export const REALM_TYPE_POSITION_INDEX = 2;
export const REALM_SECTION_POSITION_INDEX = 3;
export const REALM_SUBSECTION_POSITION_INDEX = 4;

export const MENU_LINKS_TOKEN = new InjectionToken<NavigationLink[]>('menu-links-token');

export const WALLETS_LINKS: string[] = [
    NavigationSections.Wallets,
    NavigationSections.WalletsWallet,
    NavigationSections.WalletsDeposits,
    NavigationSections.WalletsWithdrawals,
    NavigationSections.WalletsReports,
    NavigationSections.WalletsIntegrations,
];

export const MENU_LINKS: NavigationLink[] = [
    {
        id: NavigationSections.Main,
        path: ROOT_ROUTE_PATH,
        navPlace: {
            page: ROOT_ROUTE_PATH,
        },
    },
    {
        id: NavigationSections.Payments,
        path: `/payment-section/realm/${REALM_TYPE}/operations/payments`,
        navPlace: {
            page: 'payment-section',
        },
    },
    {
        id: NavigationSections.Wallets,
        path: '/wallet-section/wallets',
        navPlace: {
            page: ['wallet-section', 'wallet'],
            section: 'wallets',
        },
    },
    {
        id: NavigationSections.WalletsDeposits,
        path: '/wallet-section/deposits',
        navPlace: {
            page: 'wallet-section',
            section: 'deposits',
        },
    },
    {
        id: NavigationSections.WalletsWithdrawals,
        path: '/wallet-section/withdrawals',
        navPlace: {
            page: 'wallet-section',
            section: 'withdrawals',
        },
    },
    {
        id: NavigationSections.WalletsIntegrations,
        path: '/wallet-section/integrations',
        navPlace: {
            page: 'wallet-section',
            section: 'integrations',
        },
    },
    {
        id: NavigationSections.Claims,
        path: '/claims',
        navPlace: {
            page: ['claims', 'claim', 'onboarding'],
        },
    },
    {
        id: NavigationSections.PaymentsAnalytics,
        path: `/payment-section/realm/${REALM_TYPE}/analytics`,
        navPlace: {
            page: 'payment-section',
            section: 'analytics',
        },
    },
    {
        id: NavigationSections.PaymentsOperations,
        path: `/payment-section/realm/${REALM_TYPE}/operations`,
        navPlace: {
            page: 'payment-section',
            section: 'operations',
        },
    },
    {
        id: NavigationSections.PaymentsPayouts,
        path: `/payment-section/realm/${REALM_TYPE}/payouts`,
        navPlace: {
            page: 'payment-section',
            section: 'payouts',
        },
    },
    {
        id: NavigationSections.PaymentsReports,
        path: `/payment-section/realm/${REALM_TYPE}/reports`,
        navPlace: {
            page: 'payment-section',
            section: 'reports',
        },
    },
    {
        id: NavigationSections.PaymentsIntegrations,
        path: `/payment-section/realm/${REALM_TYPE}/integrations`,
        navPlace: {
            page: 'payment-section',
            section: 'integrations',
        },
    },
];
