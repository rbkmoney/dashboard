import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RefundSearchResult } from '@dsh/api-codegen/anapi';

@Component({
    selector: 'dsh-refund-main-info',
    templateUrl: 'refund-main-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundMainInfoComponent {
    @Input() refund: RefundSearchResult;
}
