import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { combineLatest, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';

import { ClaimsService, ShopService } from '../../../../api';
import { ClaimStatus } from '../../../../api/claims';
import { toContentConf } from './to-content-conf';
import { ActionBtnContent, TestEnvBtnContent } from './content-config';
import { booleanDelay, takeError } from '../../../../custom-operators';

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
        private transloco: TranslocoService
    ) {
        const claims = this.claimService.search1000Claims([
            ClaimStatus.Pending,
            ClaimStatus.PendingAcceptance,
            ClaimStatus.Review
        ]);
        const contentConfig = toContentConf(this.shopService.shops$, claims);
        this.actionBtnContent$ = contentConfig.pipe(pluck('actionBtnContent'));
        this.testEnvBtnContent$ = contentConfig.pipe(pluck('testEnvBtnContent'));
        this.subheading$ = contentConfig.pipe(pluck('subheading'));
        this.isLoading$ = combineLatest(this.shopService.shops$, claims).pipe(booleanDelay());
        combineLatest(this.isLoading$, contentConfig)
            .pipe(takeError)
            .subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }
}
