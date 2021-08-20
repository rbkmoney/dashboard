import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl } from '@ngneat/reactive-forms';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import pick from 'lodash-es/pick';
import { Observable, of } from 'rxjs';
import { map, pluck, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { BankAccount, PayoutTool } from '@dsh/api-codegen/capi';

import { ShopPayoutToolDetailsService } from '../../../../sections/payment-section/integrations/shops/services/shop-payout-tool-details/shop-payout-tool-details.service';
import { PayoutToolParams } from '../../../../sections/payment-section/integrations/shops/shops-list/shop-details/types/payout-tool-params';
import { CreateRussianShopEntityService } from './services/create-russian-shop-entity/create-russian-shop-entity.service';
import { BankAccountType } from './types/bank-account-type';
import { RussianShopEntity } from './types/russian-shop-entity';

@UntilDestroy()
@Component({
    selector: 'dsh-create-russian-shop-entity',
    templateUrl: 'create-russian-shop-entity.component.html',
    styleUrls: ['create-russian-shop-entity.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreateRussianShopEntityService],
})
export class CreateRussianShopEntityComponent implements OnInit {
    @Output() cancel = new EventEmitter<void>();
    @Output() send = new EventEmitter<void>();

    form = new FormControl<RussianShopEntity>();
    payoutTool$: Observable<PayoutTool> = this.payoutToolService.shopPayoutTool$;
    isLoading$ = this.payoutToolService.isLoading$;
    hasError$ = this.payoutToolService.errorOccurred$;

    constructor(
        private createShopRussianLegalEntityService: CreateRussianShopEntityService,
        private payoutToolService: ShopPayoutToolDetailsService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.form.valueChanges.pipe(pluck('bankShop'), untilDestroyed(this)).subscribe((shop) => {
            this.payoutToolService.requestPayoutTool(
                shop ? (pick(shop, ['contractID', 'payoutToolID']) as PayoutToolParams) : null
            );
        });
    }

    cancelCreation(): void {
        this.cancel.emit();
    }

    createShop(): void {
        const { shopDetails, orgDetails, bankAccountType, newBankAccount } = this.form.value;
        let bankAccount$ = of<BankAccount>(newBankAccount);
        let payoutToolId$ = of<string>(null);

        if (bankAccountType === BankAccountType.Existing) {
            bankAccount$ = this.payoutTool$.pipe(map(({ details }) => details as any as BankAccount));
            payoutToolId$ = this.payoutTool$.pipe(pluck('id'));
        }

        bankAccount$
            .pipe(
                withLatestFrom(payoutToolId$),
                switchMap(([bankAccount, payoutToolID]) =>
                    this.createShopRussianLegalEntityService.createShop({
                        shopDetails,
                        contract: orgDetails.contract,
                        payoutToolID,
                        bankAccount,
                    })
                ),
                take(1),
                untilDestroyed(this)
            )
            .subscribe(
                ({ id }) => {
                    this.send.emit();
                    void this.router.navigate(['claim-section', 'claims', id]);
                },
                (err) => {
                    console.error(err);
                    this.snackBar.open(this.transloco.translate('commonError'), 'OK');
                }
            );
    }
}
