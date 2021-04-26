import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { CategoriesService as CategoriesApiService } from '@dsh/api-codegen/capi';

import { SHARE_REPLAY_CONF } from '../../custom-operators';
import { genXRequestID } from '../utils';

@Injectable()
export class CategoriesService {
    private reloadCategories$ = new BehaviorSubject<void>(undefined);

    // eslint-disable-next-line @typescript-eslint/member-ordering
    categories$ = this.reloadCategories$.pipe(
        switchMap(() => this.categoriesService.getCategories(genXRequestID())),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private categoriesService: CategoriesApiService) {}

    reload() {
        this.reloadCategories$.next();
    }
}
