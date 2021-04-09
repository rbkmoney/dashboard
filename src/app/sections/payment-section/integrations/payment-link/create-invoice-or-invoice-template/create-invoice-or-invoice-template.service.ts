import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { pluck, shareReplay } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api/shop';

import { SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { filterShopsByRealm } from '../../../operations/operators';

@Injectable()
export class CreateInvoiceOrInvoiceTemplateService {
    form = this.fb.group({ type: null });

    shops$ = this.route.params.pipe(
        pluck('realm'),
        filterShopsByRealm(this.shopService.shops$),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private shopService: ApiShopsService) {}
}
