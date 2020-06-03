import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { ShopService } from '../../../../api';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { mapToShopInfo } from '../../operations/operators';

@Injectable()
export class ReportListService {
    shopsInfo$ = this.shopService.shops$.pipe(mapToShopInfo, shareReplay(SHARE_REPLAY_CONF));

    constructor(private shopService: ShopService) {}
}
