import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { combineLatest, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import isEmpty from 'lodash/isEmpty';
import negate from 'lodash/negate';

import { ShopService, ClaimsService, filterTestShops } from '../../../../api';
import { booleanDelay } from '../../../../custom-operators/boolean-delay';
import { ClaimStatus } from '../../../../api/claims/claims.service';
import { routeEnv } from '../../../route-env';
import { toContentConf } from './to-content-conf';
import { LocaleDictionaryService } from '../../../../locale';
import { ActionBtnContent, TestEnvBtnContent } from './content-config';

@Injectable()
export class PaymentsService {
    private claims$ = this.claimService.search1000Claims([
        ClaimStatus.Pending,
        ClaimStatus.PendingAcceptance,
        ClaimStatus.Review
    ]);
    // isLoading$ = combineLatest(this.shopService.shops$, this.claims$).pipe(booleanDelay());

    // hasTestEnvironment$ = this.shopService.shops$.pipe(
    //     filterTestShops,
    //     map(negate(isEmpty))
    // );
    // testEnvironmentRouterLink = `/payment-section/env/${routeEnv['0']}/operations`;

    subheading$: Observable<string>;
    actionBtnContent$: Observable<ActionBtnContent>;
    testEnvBtnContent$: Observable<TestEnvBtnContent>;
    isLoading$: Observable<boolean>;

    constructor(
        private shopService: ShopService,
        private claimService: ClaimsService,
        private snackBar: MatSnackBar,
        private dicService: LocaleDictionaryService
    ) {
        const contentConfig = toContentConf(this.shopService.shops$, this.claims$)
            .pipe
            // catchError(() => {
            //     this.snackBar.open(this.dicService.mapDictionaryKey('common.httpError'), 'OK');
            //     return [];
            // })
            ();
        this.actionBtnContent$ = contentConfig.pipe(map(c => c.actionBtnContent));
        this.testEnvBtnContent$ = contentConfig.pipe(map(c => c.testEnvBtnContent));
        this.subheading$ = contentConfig.pipe(map(c => c.subheading));
        this.isLoading$ = contentConfig.pipe(map(c => c.isLoading));
    }
}
