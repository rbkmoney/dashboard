import { PaymentInstitutionRealm } from '@dsh/api';

import { NavigationLink } from './types/navigation-link';
import { NavigationSections } from './types/navigation-sections';

export const MENU_LINKS: NavigationLink[] = [
    {
        id: NavigationSections.main,
        path: '/',
    },
    {
        id: NavigationSections.payments,
        path: `/payment-section/realm/${PaymentInstitutionRealm.live}/operations/payments`,
        activateStartPaths: ['/payment-section', '/invoice'],
    },
    {
        id: NavigationSections.wallets,
        path: '/wallet-section/wallets',
        activateStartPaths: ['/wallet-section', '/wallet'],
    },
    {
        id: NavigationSections.claims,
        path: '/claims',
        activateStartPaths: ['/claims', '/claim', '/onboarding'],
    },
    {
        id: NavigationSections.analytics,
        path: `/payment-section/realm/${PaymentInstitutionRealm.live}/analytics`,
    },
    {
        id: NavigationSections.operations,
        path: `/payment-section/realm/${PaymentInstitutionRealm.live}/operations`,
    },
    {
        id: NavigationSections.payouts,
        path: `/payment-section/realm/${PaymentInstitutionRealm.live}/payouts`,
    },
    {
        id: NavigationSections.reports,
        path: `/payment-section/realm/${PaymentInstitutionRealm.live}/reports`,
    },
    {
        id: NavigationSections.integrations,
        path: `/payment-section/realm/${PaymentInstitutionRealm.live}/integrations`,
    },
];
