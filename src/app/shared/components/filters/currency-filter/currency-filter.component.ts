import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { provideValueAccessor } from '@s-libs/ng-core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Currency } from '@dsh/api-codegen/capi';
import { FilterSuperclass } from '@dsh/components/filter';

@Component({
    selector: 'dsh-currency-filter',
    templateUrl: 'currency-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(CurrencyFilterComponent)],
})
export class CurrencyFilterComponent extends FilterSuperclass<Currency> {
    @Input() currencies: string[] = [];

    activeLabel$ = combineLatest(
        this.savedValue$,
        this.transloco.selectTranslate<string>('label', null, 'currency-filter')
    ).pipe(map(([v, label]) => `${label} · ${getCurrencySymbol(v, 'narrow')}`));

    constructor(injector: Injector, private transloco: TranslocoService) {
        super(injector);
    }
}
