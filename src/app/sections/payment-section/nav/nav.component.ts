import { Component, Input } from '@angular/core';

import { NavbarDirection, IconSize } from '@dsh/components/navigation';

interface NavbarConfig {
    navDirection: NavbarDirection;
    hideNavItemContent: boolean;
    iconSize: IconSize;
}

type NavMode = 'desktop' | 'mobile';

@Component({
    selector: 'dsh-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.scss'],
})
export class NavComponent {
    @Input() mode: NavMode = 'desktop';

    get navbarConfig(): NavbarConfig {
        switch (this.mode) {
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
    }
}
