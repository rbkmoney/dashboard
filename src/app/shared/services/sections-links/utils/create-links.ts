import { SectionLink } from '../model';

export const createLinks = (
    { claims, payments, wallets }: { [k: string]: string },
    hasWallets: boolean
): SectionLink[] =>
    [
        {
            label: payments,
            path: `/payment-section`,
        },
        hasWallets && {
            label: wallets,
            path: '/wallet-section',
        },
        { label: claims, path: '/claim-section' },
    ].filter(Boolean);
