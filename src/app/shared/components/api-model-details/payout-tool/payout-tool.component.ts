import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PayoutTool } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-payout-tool',
    templateUrl: 'payout-tool.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayoutToolComponent {
    @Input() payoutTool: PayoutTool;
}
