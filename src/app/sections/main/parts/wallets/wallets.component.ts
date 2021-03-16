import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ThemeName } from '../../../../theme-manager';

@Component({
    selector: 'dsh-wallets',
    templateUrl: 'wallets.component.html',
    styleUrls: ['wallets.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsComponent {
    @Input() currentThemeName: ThemeName;

    get iconName(): string {
        switch (this.currentThemeName) {
            case ThemeName.main:
                return 'wallet';
            case ThemeName.persianGreen:
                return 'wallet_persian_green';
            default:
                return '';
        }
    }
}
