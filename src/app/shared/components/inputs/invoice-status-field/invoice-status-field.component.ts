import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { InvoiceStatus } from '@dsh/api-codegen/anapi';
import { Option } from '@dsh/components/form-controls/radio-group-field';

import { InvoiceStatusLabelPipe } from './pipes/invoce-status-label.pipe';
import { OPTION_LABELS } from './types/option-labels';

import StatusEnum = InvoiceStatus.StatusEnum;

@Component({
    selector: 'dsh-invoice-status-field',
    templateUrl: 'invoice-status-field.component.html',
    providers: [provideValueAccessor(InvoiceStatusFieldComponent), InvoiceStatusLabelPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceStatusFieldComponent extends WrappedFormControlSuperclass<StatusEnum> {
    options$: Observable<Option<string>[]> = combineLatest(
        Object.keys(OPTION_LABELS).map((value: StatusEnum) =>
            this.invoiceStatusLabelPipe.transform(value).pipe(map((label) => ({ value, label })))
        )
    );

    constructor(injector: Injector, private invoiceStatusLabelPipe: InvoiceStatusLabelPipe) {
        super(injector);
    }
}
