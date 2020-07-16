import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { coerceBoolean } from '../../../utils';
import { PayoutToolDetails } from '../../api-codegen/anapi';

@Component({
    selector: 'dsh-payout-tool-info',
    templateUrl: 'payout-tool-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayoutToolInfoComponent {
    @Input() @coerceBoolean hideTitle: boolean;
    @Input() payoutToolDetails: PayoutToolDetails;
}
