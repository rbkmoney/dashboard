import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { shareReplay } from 'rxjs/operators';

import { ShopService } from '../../../../../api';
import { SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { mapToShopInfo } from '../../../operations/operators';

@Injectable()
export class ShopsPanelsListService {
    shopsInfo$ = this.shopService.shops$.pipe(mapToShopInfo, shareReplay(SHARE_REPLAY_CONF));

    constructor(private dialog: MatDialog, private shopService: ShopService) {}
}
