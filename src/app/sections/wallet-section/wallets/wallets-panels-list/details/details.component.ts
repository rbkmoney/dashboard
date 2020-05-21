import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';

import { Wallet } from '../../../../../api-codegen/wallet-api/swagger-codegen';
import { LAYOUT_GAP } from '../../../../constants';

@Component({
    selector: 'dsh-wallet-details',
    templateUrl: 'details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
    @Input()
    wallet: Wallet;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
