import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, tap, share } from 'rxjs/operators';

import { PayoutsService } from '@dsh/api';
import { PayoutTool, Shop } from '@dsh/api-codegen/capi';
import {
    ValidatedWrappedAbstractControlSuperclass,
    createValidatedAbstractControlProviders,
    progressTo,
    errorTo,
} from '@dsh/utils';

@UntilDestroy()
@Component({
    selector: 'dsh-existing-bank-account',
    templateUrl: 'existing-bank-account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(ExistingBankAccountComponent),
})
export class ExistingBankAccountComponent extends ValidatedWrappedAbstractControlSuperclass<PayoutTool, Shop> {
    formControl = new FormControl<Shop>(null);
    payoutTool: PayoutTool = null;
    progress$ = new BehaviorSubject<number>(0);
    error$ = new BehaviorSubject<unknown>(null);

    constructor(injector: Injector, private payoutsService: PayoutsService) {
        super(injector);
    }

    protected setUpInnerToOuter$(value$: Observable<Shop>): Observable<PayoutTool> {
        return value$.pipe(
            switchMap((shop) => {
                if (!shop?.contractID || !shop?.payoutToolID) return of<PayoutTool>(null);
                return this.payoutsService
                    .getPayoutToolByID(shop.contractID, shop.payoutToolID)
                    .pipe(progressTo(this.progress$), errorTo(this.error$));
            }),
            tap((payoutTool) => (this.payoutTool = payoutTool)),
            share()
        );
    }

    protected outerToInner(): Shop {
        return null;
    }
}
