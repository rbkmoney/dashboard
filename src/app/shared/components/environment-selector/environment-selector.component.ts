import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaymentInstitution } from '@dsh/api-codegen/capi';
import { Option } from '@dsh/components/form-controls/radio-group-field';

import RealmEnum = PaymentInstitution.RealmEnum;

@Component({
    selector: 'dsh-environment-selector',
    templateUrl: 'environment-selector.component.html',
    providers: [provideValueAccessor(EnvironmentSelectorComponent), TranslocoService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnvironmentSelectorComponent extends WrappedFormControlSuperclass<RealmEnum> {
    options$: Observable<Option<string>[]> = this.transloco
        .selectTranslation('environment-selector')
        .pipe(
            map((translate) => Object.values(RealmEnum).map((value) => ({ value, label: translate[value] as string })))
        );

    constructor(injector: Injector, private transloco: TranslocoService) {
        super(injector);
    }
}
