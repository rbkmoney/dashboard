import { SectionLink } from '../model';

export const createLinks = (
    { claims, main, payments, wallets }: { [k: string]: string },
    hasWallets: boolean,
    hideMain: boolean = false
): SectionLink[] =>
    [
        !hideMain && {
            label: main,
            path: '/',
            exact: true,
        },
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
