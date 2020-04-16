import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoriesService } from '../../../../../api';
import { Category } from '../../../../../api-codegen/capi';

@Pipe({ name: 'category', pure: false })
export class CategoryPipe implements PipeTransform, OnDestroy {
    private categoryID$ = new Subject<number>();
    private subscription = combineLatest([this.categoryID$, this.categoriesService.categories$])
        .pipe(map(([categoryID, categories]) => categories.find(c => c.categoryID === categoryID)))
        .subscribe(category => this.updateValue(category));
    private latestValue: Category;

    constructor(private categoriesService: CategoriesService, private ref: ChangeDetectorRef) {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    transform(categoryID: number): Category {
        this.categoryID$.next(categoryID);
        return this.latestValue;
    }

    private updateValue(category: Category) {
        this.latestValue = category;
        this.ref.markForCheck();
    }
}
