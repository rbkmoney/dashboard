import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaymentInstitution } from '@dsh/api-codegen/capi';
import { Option } from '@dsh/components/form-controls/radio-group-field';

import RealmEnum = PaymentInstitution.RealmEnum;

@Component({
    selector: 'dsh-realm-selector',
    templateUrl: 'realm-selector.component.html',
    providers: [provideValueAccessor(RealmSelectorComponent), TranslocoService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RealmSelectorComponent extends WrappedFormControlSuperclass<RealmEnum> {
    options$: Observable<Option<string>[]> = combineLatest(
        Object.values(RealmEnum).map((value) =>
            this.transloco
                .selectTranslation('realm-selector')
                .pipe(map((translate) => ({ value, label: translate[value] as string })))
        )
    );

    constructor(injector: Injector, private transloco: TranslocoService) {
        super(injector);
    }
}
