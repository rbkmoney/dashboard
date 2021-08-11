import { NavbarMode, NavbarResponsiveConfig } from '../model';

export const toResponsiveConfig = (mode: NavbarMode): NavbarResponsiveConfig => {
    switch (mode) {
        case 'desktop':
            return {
                navDirection: 'column',
                hideNavItemContent: false,
                iconSize: 'md',
            };
        case 'mobile':
            return {
                navDirection: 'row',
                hideNavItemContent: true,
                iconSize: 'lg',
            };
    }
};
