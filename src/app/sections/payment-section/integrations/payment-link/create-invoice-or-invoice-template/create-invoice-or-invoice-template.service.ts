import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@ngneat/reactive-forms';
import { pluck, shareReplay } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api/shop';
import { FormData } from '@dsh/app/shared/components/create-invoice-form';
import { SHARE_REPLAY_CONF } from '@dsh/operators';

import { filterShopsByRealm } from '../../../operations/operators';

@Injectable()
export class CreateInvoiceOrInvoiceTemplateService {
    form = this.fb.group({ type: null });
    createInvoiceFormControl = new FormControl<FormData>();

    shops$ = this.route.params.pipe(
        pluck('realm'),
        filterShopsByRealm(this.shopService.shops$),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private shopService: ApiShopsService) {}
}
