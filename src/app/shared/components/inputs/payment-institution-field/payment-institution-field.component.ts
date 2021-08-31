import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { PaymentInstitution } from '@dsh/api-codegen/capi';
import { PaymentInstitutionsService } from '@dsh/api/payment-institutions';
import { Option } from '@dsh/components/form-controls/select-search-field';
import { coerceBoolean } from '@dsh/utils';

@Component({
    selector: 'dsh-payment-institution-field',
    templateUrl: 'payment-institution-field.component.html',
    providers: [provideValueAccessor(PaymentInstitutionFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentInstitutionFieldComponent extends WrappedFormControlSuperclass<PaymentInstitution> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    options$: Observable<Option<PaymentInstitution>[]> = this.paymentInstitutionsService.paymentInstitutions$.pipe(
        map((paymentInstitutions) =>
            paymentInstitutions.map((paymentInstitution) => ({
                label: `${paymentInstitution.id} - ${paymentInstitution.name}`,
                value: paymentInstitution,
            }))
        ),
        share()
    );

    constructor(injector: Injector, private paymentInstitutionsService: PaymentInstitutionsService) {
        super(injector);
    }
}
