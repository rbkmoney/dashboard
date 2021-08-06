import { LinkId, ToolbarLink } from '../model';

export const createLinks = (hasWallets: boolean): ToolbarLink[] =>
    [
        {
            id: LinkId.Main,
            path: '/',
            exact: true,
        },
        {
            id: LinkId.Payments,
            path: `/payment-section`,
        },
        hasWallets && {
            id: LinkId.Wallets,
            path: '/wallet-section',
        },
        { id: LinkId.Claims, path: '/claim-section' },
    ].filter(Boolean);
