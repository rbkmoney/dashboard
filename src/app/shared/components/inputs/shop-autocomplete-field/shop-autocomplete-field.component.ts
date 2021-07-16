import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { map } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { coerceBoolean } from '@dsh/utils';

import { ShopId } from './types';
import { shopsToOptions } from './utils';

@Component({
    selector: 'dsh-shop-autocomplete-field',
    templateUrl: 'shop-autocomplete-field.component.html',
    providers: [provideValueAccessor(ShopAutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopAutocompleteFieldComponent extends WrappedFormControlSuperclass<ShopId> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    shops$ = this.apiShopsService.shops$;
    options$ = this.shops$.pipe(map(shopsToOptions));

    constructor(injector: Injector, private apiShopsService: ApiShopsService) {
        super(injector);
    }
}
