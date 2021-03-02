import { InjectionToken } from '@angular/core';

import { NavigationLink } from './types/navigation-link';
import { NavigationSections } from './types/navigation-sections';

export const ROOT_ROUTE_PATH = '/';

export const REALM_TYPE = 'REALM_TYPE';

export const PAGE_POSITION_INDEX = 0;
export const REALM_TYPE_POSITION = 2;
export const SECTION_POSITION_INDEX = 3;
export const SUBSECTION_POSITION_INDEX = 4;

export const MENU_LINKS_TOKEN = new InjectionToken<NavigationLink[]>('menu-links-token');

export const MENU_LINKS: NavigationLink[] = [
    {
        id: NavigationSections.main,
        path: ROOT_ROUTE_PATH,
        navPlace: {
            page: ROOT_ROUTE_PATH,
        },
    },
    {
        id: NavigationSections.payments,
        path: `/payment-section/realm/${REALM_TYPE}/operations/payments`,
        navPlace: {
            page: 'payment-section',
        },
    },
    {
        id: NavigationSections.wallets,
        path: '/wallet-section/wallets',
        navPlace: {
            page: ['wallet-section', 'wallet'],
        },
    },
    {
        id: NavigationSections.claims,
        path: '/claims',
        navPlace: {
            page: ['claims', 'claim', 'onboarding'],
        },
    },
    {
        id: NavigationSections.analytics,
        path: `/payment-section/realm/${REALM_TYPE}/analytics`,
        navPlace: {
            page: 'payment-section',
            section: 'analytics',
        },
    },
    {
        id: NavigationSections.operations,
        path: `/payment-section/realm/${REALM_TYPE}/operations`,
        navPlace: {
            page: 'payment-section',
            section: 'operations',
        },
    },
    {
        id: NavigationSections.payouts,
        path: `/payment-section/realm/${REALM_TYPE}/payouts`,
        navPlace: {
            page: 'payment-section',
            section: 'payouts',
        },
    },
    {
        id: NavigationSections.reports,
        path: `/payment-section/realm/${REALM_TYPE}/reports`,
        navPlace: {
            page: 'payment-section',
            section: 'reports',
        },
    },
    {
        id: NavigationSections.integrations,
        path: `/payment-section/realm/${REALM_TYPE}/integrations`,
        navPlace: {
            page: 'payment-section',
            section: 'integrations',
        },
    },
];
