import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { BehaviorSubject } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { CategoriesService as CategoriesApiService } from '@dsh/api-codegen/capi';

import { SHARE_REPLAY_CONF } from '../../custom-operators';

@Injectable()
export class CategoriesService {
    private reloadCategories$ = new BehaviorSubject<void>(undefined);

    // eslint-disable-next-line @typescript-eslint/member-ordering
    categories$ = this.reloadCategories$.pipe(
        switchMap(() => this.categoriesService.getCategories(this.idGenerator.shortUuid())),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private categoriesService: CategoriesApiService, private idGenerator: IdGeneratorService) {}

    reload() {
        this.reloadCategories$.next();
    }
}
