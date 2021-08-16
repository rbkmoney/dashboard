import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IconName } from './icon-name';
import { ColoredIconSize } from './model';

export type IconColor = 'primary' | 'default' | 'contrast-text';

@Component({
    selector: 'dsh-colored-icon',
    templateUrl: 'colored-icon.component.html',
    styleUrls: ['colored-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColoredIconComponent {
    @Input() color: IconColor = 'default';
    @Input() icon: IconName;
    @Input() size: ColoredIconSize = 'md';

    calcIconClass(icon: IconName, color: IconColor = 'default', prefix = 'dsh-colored-icon'): string {
        switch (icon) {
            case 'pie_chart':
                return `${prefix}-pie-chart-${color}`;
            case 'table_chart':
                return `${prefix}-table-chart-${color}`;
            case 'output':
                return `${prefix}-output-${color}`;
            case 'input':
                return `${prefix}-input-${color}`;
            case 'description':
                return `${prefix}-description-${color}`;
            case 'build':
                return `${prefix}-build-${color}`;
            case 'wallet_menu':
                return `${prefix}-wallet-menu-${color}`;
            case 'cross':
                return `${prefix}-cross-${color}`;
            default:
                return '';
        }
    }

    calcSizeClass(prefix = 'dsh-icon'): string {
        return `${prefix}-${this.size}`;
    }
}
