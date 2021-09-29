import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-wallet-row',
    templateUrl: 'wallet-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletRowComponent {
    @Input() walletName: string;
}
