import { Component, Injector, OnChanges } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';

import { valuesToOptions } from '@dsh/components/form-controls/utils/values-to-options';

import { ClaimStatusesLabelPipe } from './pipes/claim-statuses-label.pipe';
import { ClaimStatusesEnum } from './types/claim-statuses-enum';

@Component({
    selector: 'dsh-claim-statuses-field',
    templateUrl: 'claim-statuses-field.component.html',
    providers: [provideValueAccessor(ClaimStatusesFieldComponent), ClaimStatusesLabelPipe],
})
export class ClaimStatusesFieldComponent
    extends WrappedFormControlSuperclass<ClaimStatusesEnum[]>
    implements OnChanges
{
    options$ = valuesToOptions(Object.values(ClaimStatusesEnum), (v) => this.claimStatusesLabelPipe.transform(v));

    constructor(injector: Injector, private claimStatusesLabelPipe: ClaimStatusesLabelPipe) {
        super(injector);
    }
}
