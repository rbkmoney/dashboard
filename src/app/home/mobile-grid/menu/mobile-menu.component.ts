import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NavigationFlatNode } from '../types/navigation-flat-node';

@Component({
    selector: 'dsh-mobile-menu',
    templateUrl: './mobile-menu.component.html',
    styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent {
    @Input() menu: NavigationFlatNode[];
    @Input() activeId: string;

    @Output() navigationChanged = new EventEmitter<void>();

    navigated(): void {
        this.navigationChanged.emit();
    }
}
