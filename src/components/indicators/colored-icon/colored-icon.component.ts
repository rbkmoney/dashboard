import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type IconName = 'pie_chart' | 'table_chart' | 'output' | 'input' | 'description' | 'build' | 'wallet_menu';

export type IconColor = 'primary';

@Component({
    selector: 'dsh-colored-icon',
    templateUrl: 'colored-icon.component.html',
    styleUrls: ['colored-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColoredIconComponent {
    @Input() color: IconColor;
    @Input() icon: IconName;

    calcIconClass(icon: IconName, color: IconColor, prefix = 'dsh-colored-icon'): string {
        if (color !== 'primary') {
            return '';
        }
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
            default:
                return '';
        }
    }
}
