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
            case ThemeName.Main:
                return 'wallet';
            case ThemeName.PersianGreen:
                return 'wallet_persian_green';
            case ThemeName.Solitude:
                return 'wallet_solitude';
            default:
                return '';
        }
    }
}
