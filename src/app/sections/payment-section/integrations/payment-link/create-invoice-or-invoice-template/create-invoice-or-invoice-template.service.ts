import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { pluck, shareReplay } from 'rxjs/operators';

import { ShopService } from '../../../../../api';
import { SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { filterShopsByEnv } from '../../../operations/operators';

@Injectable()
export class CreateInvoiceOrInvoiceTemplateService {
    form = this.fb.group({ type: null });

    shops$ = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private shopService: ShopService) {}
}
