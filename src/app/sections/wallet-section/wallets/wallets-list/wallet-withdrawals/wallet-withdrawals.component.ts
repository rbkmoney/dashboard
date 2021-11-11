import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-wallet-withdrawals',
    templateUrl: 'wallet-withdrawals.component.html',
    styleUrls: ['wallet-withdrawals.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletWithdrawalsComponent {
    @Input() walletID: string;
}
