import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { provideValueAccessor } from '@s-libs/ng-core';

import { RefundStatus } from '@dsh/api-codegen/dark-api';
import { FilterSuperclass } from '@dsh/components/filter';

@Component({
    selector: 'dsh-refund-status-filter',
    templateUrl: 'refund-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(RefundStatusFilterComponent)],
})
export class RefundStatusFilterComponent extends FilterSuperclass<RefundStatus.StatusEnum> {
    constructor(injector: Injector) {
        super(injector);
    }
}
