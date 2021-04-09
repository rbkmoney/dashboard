import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RefundSearchResult } from '@dsh/api-codegen/capi/swagger-codegen';

@Component({
    selector: 'dsh-refund-details',
    templateUrl: 'refund-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundDetailsComponent {
    @Input() refund: RefundSearchResult;
}
