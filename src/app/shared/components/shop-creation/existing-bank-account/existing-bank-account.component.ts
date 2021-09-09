import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, BehaviorSubject, of, throwError, EMPTY } from 'rxjs';
import { switchMap, tap, share, catchError } from 'rxjs/operators';
import { Overwrite } from 'utility-types';

import { PayoutsService } from '@dsh/api';
import {
    PayoutTool,
    PayoutToolDetailsBankAccount,
    PayoutToolDetailsInternationalBankAccount,
    Shop,
} from '@dsh/api-codegen/capi';
import { CommonError, ErrorService } from '@dsh/app/shared';
import {
    ValidatedWrappedAbstractControlSuperclass,
    createValidatedAbstractControlProviders,
    progressTo,
    errorTo,
} from '@dsh/utils';

type BankAccountType = 'PayoutToolDetailsInternationalBankAccount' | 'PayoutToolDetailsBankAccount';

export type ExistingBankAccountForm<T extends BankAccountType = BankAccountType> = Overwrite<
    PayoutTool,
    {
        details: T extends 'PayoutToolDetailsInternationalBankAccount'
            ? PayoutToolDetailsInternationalBankAccount
            : PayoutToolDetailsBankAccount;
    }
>;

@UntilDestroy()
@Component({
    selector: 'dsh-existing-bank-account',
    templateUrl: 'existing-bank-account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(ExistingBankAccountComponent),
})
export class ExistingBankAccountComponent extends ValidatedWrappedAbstractControlSuperclass<
    ExistingBankAccountForm,
    Shop
> {
    @Input() bankAccountType: BankAccountType;

    formControl = new FormControl<Shop>(null);
    payoutTool: PayoutTool = null;
    progress$ = new BehaviorSubject<number>(0);
    error$ = new BehaviorSubject<unknown>(null);

    constructor(
        injector: Injector,
        private payoutsService: PayoutsService,
        private transloco: TranslocoService,
        private errorService: ErrorService
    ) {
        super(injector);
    }

    protected setUpInnerToOuter$(value$: Observable<Shop>): Observable<PayoutTool> {
        return value$.pipe(
            switchMap((shop) =>
                (shop?.contractID && shop?.payoutToolID
                    ? this.payoutsService.getPayoutToolByID(shop.contractID, shop.payoutToolID).pipe(
                          switchMap((payoutTool) => {
                              if (payoutTool.details.detailsType !== this.bankAccountType)
                                  return this.transloco
                                      .selectTranslate(
                                          `existingBankAccountForm.errors.${
                                              this.bankAccountType === 'PayoutToolDetailsInternationalBankAccount'
                                                  ? 'onlyInternationalShopCanBeSelected'
                                                  : 'onlyRussianShopCanBeSelected'
                                          }`,
                                          null,
                                          'create-shop'
                                      )
                                      .pipe(switchMap((t) => throwError(new CommonError(t))));
                              return of(payoutTool);
                          })
                      )
                    : of<PayoutTool>(null)
                ).pipe(
                    progressTo(this.progress$),
                    errorTo(this.error$),
                    catchError((err) => (this.errorService.error(err, false), EMPTY))
                )
            ),
            tap((payoutTool) => (this.payoutTool = payoutTool)),
            share()
        );
    }

    protected outerToInner(): Shop {
        return null;
    }
}
