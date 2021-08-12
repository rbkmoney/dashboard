import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { CategoriesService } from '@dsh/api';
import { Category } from '@dsh/api-codegen/capi';
import { Option } from '@dsh/components/form-controls/select-search-field';
import { coerceBoolean } from '@dsh/utils';

@Component({
    selector: 'dsh-category-autocomplete-field',
    templateUrl: 'category-autocomplete-field.component.html',
    providers: [provideValueAccessor(CategoryAutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryAutocompleteFieldComponent extends WrappedFormControlSuperclass<Category> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    options$: Observable<Option<Category>[]> = this.categoriesService.categories$.pipe(
        map((categories) =>
            categories.map((category) => ({ label: `${category.categoryID} - ${category.name}`, value: category }))
        ),
        share()
    );

    constructor(injector: Injector, private categoriesService: CategoriesService) {
        super(injector);
    }
}
