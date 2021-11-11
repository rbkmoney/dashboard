import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-wallet-deposits',
    templateUrl: 'wallet-deposits.component.html',
    styleUrls: ['wallet-deposits.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletDepositsComponent {
    @Input() walletID: string;
}
