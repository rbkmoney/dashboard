import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, combineLatest, of } from 'rxjs';
import { map, catchError, first } from 'rxjs/operators';

import { ShopService, ClaimsService } from '../../../../api';
import { ClaimStatus } from '../../../../api/claims/claims.service';
import { toContentConf } from './to-content-conf';
import { LocaleDictionaryService } from '../../../../locale';
import { ActionBtnContent, TestEnvBtnContent } from './content-config';
import { booleanDelay } from '../../../../custom-operators';

@Injectable()
export class PaymentsService {
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
        const claims = this.claimService.search1000Claims([
            ClaimStatus.Pending,
            ClaimStatus.PendingAcceptance,
            ClaimStatus.Review
        ]);
        const contentConfig = toContentConf(this.shopService.shops$, claims);
        this.actionBtnContent$ = contentConfig.pipe(map(c => c.actionBtnContent));
        this.testEnvBtnContent$ = contentConfig.pipe(map(c => c.testEnvBtnContent));
        this.subheading$ = contentConfig.pipe(map(c => c.subheading));
        this.isLoading$ = combineLatest(this.shopService.shops$, claims).pipe(booleanDelay());
        combineLatest(this.isLoading$, contentConfig)
            .pipe(
                catchError(err => of(err)),
                first()
            )
            .subscribe(() => this.snackBar.open(this.dicService.mapDictionaryKey('common.commonError'), 'OK'));
    }
}
