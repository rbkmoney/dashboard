import { Component, Input, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';

import { coerceBoolean } from '@dsh/utils';

@Component({
    selector: 'dsh-mobile-grid',
    templateUrl: './mobile-grid.component.html',
    styleUrls: ['./mobile-grid.component.scss'],
})
export class MobileGridComponent {
    @Input()
    @coerceBoolean
    inverted: boolean;

    @Input() logoName: string;

    @ViewChild(MatDrawer) drawer: MatDrawer;

    get menuIcon(): string {
        return this.inverted ? 'menu_inverted' : 'menu';
    }

    openSideNav(): Promise<MatDrawerToggleResult> {
        return this.drawer.open('program');
    }

    closeSideNav(): Promise<MatDrawerToggleResult> {
        return this.drawer.close();
    }
}
