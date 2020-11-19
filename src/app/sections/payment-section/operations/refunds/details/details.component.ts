import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RefundSearchResult } from '../../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-details',
    templateUrl: 'details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
    @Input() refund: RefundSearchResult;
}
