import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { BehaviorSubject, defer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PaymentInstitutionsService as ApiPaymentInstitutionsService } from '@dsh/api-codegen/capi';
import { publishReplayRefCount } from '@dsh/operators';

@Injectable({
    providedIn: 'root',
})
export class PaymentInstitutionsService {
    paymentInstitutions$ = defer(() => this.reload$).pipe(
        switchMap(() => this.paymentInstitutionsService.getPaymentInstitutions(this.idGenerator.shortUuid())),
        publishReplayRefCount()
    );

    private reload$ = new BehaviorSubject<void>(undefined);

    constructor(
        private paymentInstitutionsService: ApiPaymentInstitutionsService,
        private idGenerator: IdGeneratorService
    ) {}

    reload(): void {
        this.reload$.next();
    }
}
