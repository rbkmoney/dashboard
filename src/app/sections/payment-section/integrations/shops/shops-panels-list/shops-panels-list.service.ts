import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { first, map, pluck, shareReplay } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { ShopsService } from '../shops.service';

@Injectable()
export class ShopsPanelsListService {
    selectedIdx$ = combineLatest([this.route.fragment, this.shopsService.shops$]).pipe(
        first(),
        map(([fragment, shops]) => shops.findIndex(({ id }) => id === fragment)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private dialog: MatDialog,
        private shopsService: ShopsService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    select(idx: number) {
        this.shopsService.shops$.pipe(pluck(idx, 'id')).subscribe(fragment => {
            this.router.navigate([], { fragment, queryParams: this.route.snapshot.queryParams });
        });
    }
}
