import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Wallet } from '@dsh/api-codegen/wallet-api';

@Component({
    selector: 'dsh-wallet-details',
    templateUrl: 'details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
    @Input()
    wallet: Wallet;
}
