import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Payout } from '../../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-common-info',
    templateUrl: 'common-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonInfoComponent {
    @Input() payout: Payout;
    @Input() shopName: string;
}
