import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Category } from '@dsh/api-codegen/capi/swagger-codegen';
import { CategoriesService } from '@dsh/api/categories';
import { SHARE_REPLAY_CONF } from '@dsh/operators';

@Injectable()
export class CategoryService {
    category$: Observable<Category | undefined>;

    private categoryID$ = new Subject<number>();

    constructor(private categoriesService: CategoriesService) {
        this.category$ = combineLatest([this.categoryID$, this.categoriesService.categories$]).pipe(
            map(([categoryID, categories]: [number, Category[]]) => {
                return categories.find((c: Category) => c.categoryID === categoryID);
            }),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }

    updateID(categoryID: number): void {
        this.categoryID$.next(categoryID);
    }
}
