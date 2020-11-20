import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RefundSearchResult } from '../../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-refund-refund-details',
    templateUrl: 'refund-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundDetailsComponent {
    @Input() refund: RefundSearchResult;
}
