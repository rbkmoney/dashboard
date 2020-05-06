import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, shareReplay } from 'rxjs/operators';

import { ShopService } from '../../../../api';
import { progress, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { filterShopsByEnv } from '../../operations/operators';

@Injectable()
export class ShopsService {
    shops$ = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        shareReplay(SHARE_REPLAY_CONF)
    );

    isLoading$ = progress(this.route.params, this.shops$).pipe(shareReplay(SHARE_REPLAY_CONF));

    constructor(private route: ActivatedRoute, private shopService: ShopService) {}
}
