import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RefundStatus } from '@dsh/api-codegen/dark-api';
import { Option } from '@dsh/components/form-controls/radio-group-field';

import { RefundStatusLabelPipe } from './pipes/refund-status-label.pipe';
import { OPTION_LABELS } from './types/option-labels';

import StatusEnum = RefundStatus.StatusEnum;

@Component({
    selector: 'dsh-refund-status-field',
    templateUrl: 'refund-status-field.component.html',
    providers: [provideValueAccessor(RefundStatusFieldComponent), RefundStatusLabelPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundStatusFieldComponent extends WrappedFormControlSuperclass<StatusEnum> {
    options$: Observable<Option<string>[]> = combineLatest(
        Object.keys(OPTION_LABELS).map((value: StatusEnum) =>
            this.refundStatusLabelPipe.transform(value).pipe(map((label) => ({ value, label })))
        )
    );

    constructor(injector: Injector, private refundStatusLabelPipe: RefundStatusLabelPipe) {
        super(injector);
    }
}
