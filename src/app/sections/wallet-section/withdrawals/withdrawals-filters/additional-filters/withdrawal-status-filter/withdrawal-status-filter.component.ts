import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WithdrawalStatus } from '@dsh/api-codegen/wallet-api';
import { Option } from '@dsh/components/form-controls/radio-group-field';

import { WithdrawalStatusLabelPipe } from './pipes';

import StatusEnum = WithdrawalStatus.StatusEnum;

const STATUSES = Object.values(WithdrawalStatus.StatusEnum);

@Component({
    selector: 'dsh-withdrawal-status-filter',
    templateUrl: './withdrawal-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [WithdrawalStatusLabelPipe, provideValueAccessor(WithdrawalStatusFilterComponent)],
})
export class WithdrawalStatusFilterComponent extends WrappedFormControlSuperclass<StatusEnum> {
    options$: Observable<Option<string>[]> = combineLatest(
        STATUSES.map((value: StatusEnum) =>
            this.withdrawalStatusLabelPipe.transform(value).pipe(map((label) => ({ value, label })))
        )
    );

    statuses = STATUSES;

    constructor(injector: Injector, private withdrawalStatusLabelPipe: WithdrawalStatusLabelPipe) {
        super(injector);
    }
}
