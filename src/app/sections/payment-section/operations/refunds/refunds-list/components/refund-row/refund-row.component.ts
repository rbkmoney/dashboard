import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RefundSearchResult } from '@dsh/api-codegen/anapi/swagger-codegen';

@Component({
    selector: 'dsh-refund-row',
    templateUrl: 'refund-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundRowComponent {
    @Input() refund: RefundSearchResult;
}
