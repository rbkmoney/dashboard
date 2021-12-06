import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BootstrapIconName, BootstrapIconSize } from './model';

@Component({
    selector: 'dsh-bi',
    templateUrl: 'bootstrap-icon.component.html',
    styleUrls: ['bootstrap-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BootstrapIconComponent {
    @Input() icon: BootstrapIconName;
    @Input() size: BootstrapIconSize = 'md';

    get bootstrapIconName(): string {
        return `bi-${this.icon}`;
    }

    get bootstrapIconSize(): string {
        switch (this.size) {
            case 'sm':
                return '16px';
            case 'md':
                return '24px';
            case 'lg':
                return '32px';
        }
    }
}
