import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-wallet-details-headline',
    templateUrl: 'wallet-details-headline.component.html',
})
export class WalletDetailsHeadlineComponent {
    @Input() walletID: string;
}
