import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RefundSearchResult } from '../../../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-main-info',
    templateUrl: 'main-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainInfoComponent {
    @Input() refund: RefundSearchResult;
}
