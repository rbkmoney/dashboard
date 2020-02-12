import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PayoutsService } from './payouts.service';

@Component({
    selector: 'dsh-payouts',
    templateUrl: 'payouts.component.html',
    styleUrls: ['payouts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PayoutsService]
})
export class PayoutsComponent {}
