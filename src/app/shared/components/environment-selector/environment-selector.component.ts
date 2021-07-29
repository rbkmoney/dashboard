import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaymentInstitution } from '@dsh/api-codegen/capi';
import { EnvironmentLabelPipe } from '@dsh/app/shared/components/environment-selector/pipes/environment-label.pipe';
import { Option } from '@dsh/components/form-controls/radio-group-field';

import { PaymentInstitutionRealmService } from '../../../sections/payment-section/services/payment-institution-realm/payment-institution-realm.service';

import RealmEnum = PaymentInstitution.RealmEnum;

@Component({
    selector: 'dsh-environment-selector',
    templateUrl: 'environment-selector.component.html',
    providers: [
        provideValueAccessor(EnvironmentSelectorComponent),
        PaymentInstitutionRealmService,
        TranslocoService,
        EnvironmentLabelPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnvironmentSelectorComponent extends WrappedFormControlSuperclass<RealmEnum> {
    options$: Observable<Option<string>[]> = combineLatest(
        Object.keys(RealmEnum).map((value: RealmEnum) =>
            this.environmentLabelPipe.transform(value).pipe(map((label) => ({ value, label })))
        )
    );

    constructor(
        injector: Injector,
        private realmService: PaymentInstitutionRealmService,
        private environmentLabelPipe: EnvironmentLabelPipe
    ) {
        super(injector);
    }
}
