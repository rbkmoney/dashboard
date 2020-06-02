import { Component, Input } from '@angular/core';

import { WalletAccountAvailable } from '../../../api-codegen/wallet-api/swagger-codegen';

@Component({
    selector: 'dsh-details',
    templateUrl: 'details.component.html',
})
export class DetailsComponent {
    @Input() walletName: string;
    @Input() createdAt: Date;
    @Input() available: WalletAccountAvailable;
}
