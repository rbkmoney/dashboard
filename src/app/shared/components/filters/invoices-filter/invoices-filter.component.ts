import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { provideValueAccessor } from '@s-libs/ng-core';

import { FilterSuperclass } from '@dsh/components/filter';

@Component({
    selector: 'dsh-invoices-filter',
    templateUrl: 'invoices-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(InvoicesFilterComponent)],
})
export class InvoicesFilterComponent extends FilterSuperclass<string[]> {
    constructor(injector: Injector) {
        super(injector);
    }
}
