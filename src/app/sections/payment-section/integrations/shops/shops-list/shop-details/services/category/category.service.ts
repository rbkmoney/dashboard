import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Category } from '../../../../../../../../api-codegen/capi/swagger-codegen';
import { CategoriesService } from '../../../../../../../../api/categories';
import { SHARE_REPLAY_CONF } from '../../../../../../../../custom-operators';

@Injectable()
export class CategoryService {
    category$: Observable<Category>;

    private categoryID$ = new Subject<number>();

    constructor(private categoriesService: CategoriesService) {
        this.category$ = combineLatest([this.categoryID$, this.categoriesService.categories$]).pipe(
            map(([categoryID, categories]: [number, Category[]]) =>
                categories.find((c) => c.categoryID === categoryID)
            ),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }

    updateID(categoryID: number): void {
        this.categoryID$.next(categoryID);
    }
}
