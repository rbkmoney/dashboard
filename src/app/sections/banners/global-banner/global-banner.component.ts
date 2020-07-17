import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Mascots } from './mascots';

@Component({
    selector: 'dsh-global-banner',
    templateUrl: 'global-banner.component.html',
    styleUrls: ['global-banner.component.scss'],
})
export class GlobalBannerComponent {
    @Input()
    mascot: Mascots;

    @Input()
    title: string;

    @Input()
    isActive: boolean;

    @Output()
    closed = new EventEmitter<void>();

    close() {
        this.closed.emit();
    }
}
