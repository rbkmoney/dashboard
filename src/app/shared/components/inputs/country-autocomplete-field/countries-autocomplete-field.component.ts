import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { map } from 'rxjs/operators';

import { CountriesService } from '@dsh/api';
import { coerceBoolean } from '@dsh/utils';

import { CountryId } from './types';
import { countriesToDisplayWithFn, countriesToOptions } from './utils';

@Component({
    selector: 'dsh-country-autocomplete-field',
    templateUrl: 'country-autocomplete-field.component.html',
    providers: [provideValueAccessor(CountryAutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryAutocompleteFieldComponent extends WrappedFormControlSuperclass<CountryId> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    countries$ = this.countriesService.countries$;
    options$ = this.countries$.pipe(map(countriesToOptions));
    displayWithFn$ = this.countries$.pipe(map(countriesToDisplayWithFn));

    constructor(injector: Injector, private countriesService: CountriesService) {
        super(injector);
    }
}
