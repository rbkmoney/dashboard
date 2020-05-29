// import { Injectable } from '@angular/core';
// import { FormBuilder } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import moment from 'moment';
//
// import { WithdrawalsService } from '../deposits.service';
// import { FormParams } from './form-params';
// import { QueryParams } from './query-params';
// import { toFormValue } from './to-form-value';
// import { toQueryParams } from './to-query-params';
// import { toSearchParams } from './to-search-params';
//
// @Injectable()
// export class SearchFormService {
//     defaultParams: FormParams = {
//         date: {
//             begin: moment().startOf('month'),
//             end: moment().endOf('month'),
//         },
//         walletID: null,
//         identityID: null,
//         depositID: null,
//         sourceID: null,
//         status: null,
//         amountFrom: null,
//         amountTo: null,
//         currencyID: null,
//     };
//
//     form = this.fb.group(this.defaultParams);
//
//     constructor(
//         private fb: FormBuilder,
//         private route: ActivatedRoute,
//         private router: Router,
//         private depositsService: WithdrawalsService
//     ) {
//         this.init();
//     }
//
//     search(value = this.form.value) {
//         console.log('SEARCH PARAMSUSUSUSUS', toSearchParams(value));
//         this.depositsService.search(toSearchParams(value));
//     }
//
//     reset() {
//         this.form.setValue(this.defaultParams);
//     }
//
//     private init() {
//         this.syncQueryParams();
//         // this.search();
//         this.form.valueChanges.subscribe((v) => {
//             console.log('SEARCH IN INIT', v);
//             this.search(v);
//         });
//         console.log('INIT', this.form.value);
//     }
//
//     private syncQueryParams() {
//         const queryParams = this.route.snapshot.queryParams as QueryParams;
//         const formValue = toFormValue(queryParams, this.defaultParams);
//         console.log('SYNC', formValue);
//         this.form.setValue(formValue);
//         this.setQueryParams(formValue);
//         this.form.valueChanges.subscribe((v) => {
//             console.log('SET QUERY PARAMS', v);
//             this.setQueryParams(v);
//         });
//     }
//
//     private setQueryParams(formValue: FormParams) {
//         const queryParams = toQueryParams(formValue);
//         this.router.navigate([location.pathname], { queryParams });
//     }
// }

import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { map, startWith } from 'rxjs/operators';

import { DepositsService } from '../deposits.service';
import { FormParams } from './form-params';
import { toFormValue } from './to-form-value';
import { toQueryParams } from './to-query-params';
import { toSearchParams } from './to-search-params';

@Injectable()
export class SearchFormService {
    static defaultParams: FormParams = {
        date: {
            begin: moment().startOf('month'),
            end: moment().endOf('month'),
        },
        walletID: null,
        identityID: null,
        depositID: null,
        sourceID: null,
        status: null,
        amountFrom: null,
        amountTo: null,
        currencyID: null,
    };

    form = this.fb.group(SearchFormService.defaultParams);

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private depositsService: DepositsService
    ) {
        this.init();
    }

    search(value) {
        this.depositsService.search(toSearchParams(value));
    }

    reset() {
        this.form.setValue(SearchFormService.defaultParams);
    }

    private init() {
        this.syncQueryParams();
        this.form.valueChanges.pipe(startWith(this.form.value)).subscribe((v) => this.search(v));
    }

    private syncQueryParams() {
        const formValue = toFormValue(this.route.snapshot.queryParams, SearchFormService.defaultParams);
        this.form.setValue(formValue);
        this.form.valueChanges.pipe(startWith(formValue), map(toQueryParams)).subscribe((queryParams) => {
            this.router.navigate([location.pathname], { queryParams });
        });
    }
}
