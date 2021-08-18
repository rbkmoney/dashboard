import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder } from '@ngneat/reactive-forms';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import pick from 'lodash-es/pick';
import { Observable, of } from 'rxjs';
import { map, pluck, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { BankAccount, PayoutTool, Shop } from '@dsh/api-codegen/capi';
import { BankAccountFormData } from '@dsh/app/shared/components/shop-creation/create-russian-shop-entity/types/bank-account-form-data';

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
    @ViewChild('content', { static: false, read: ElementRef }) contentRef: ElementRef<HTMLElement>;

    @Output() cancel = new EventEmitter<void>();
    @Output() send = new EventEmitter<void>();

    form = this.fb.group<RussianShopEntity>({
        shopDetails: null,
        bankAccountType: null,
        newBankAccount: this.fb.group<BankAccountFormData>({
            search: '',
            bankName: ['', Validators.required],
            bankBik: ['', Validators.required],
            bankPostAccount: ['', Validators.required],
            account: ['', Validators.required],
        }),
        bankShop: [null, Validators.required],
        contract: [null, Validators.required],
    });

    payoutTool$: Observable<PayoutTool> = this.payoutToolService.shopPayoutTool$;
    isLoading$ = this.payoutToolService.isLoading$;
    hasError$ = this.payoutToolService.errorOccurred$;

    get contentElement(): HTMLElement | undefined {
        return this.contentRef?.nativeElement?.parentElement;
    }

    constructor(
        private fb: FormBuilder,
        private createShopRussianLegalEntityService: CreateRussianShopEntityService,
        private payoutToolService: ShopPayoutToolDetailsService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    ngOnInit(): void {
        (this.form.get('bankShop').valueChanges as Observable<Shop>).pipe(untilDestroyed(this)).subscribe((shop) => {
            this.payoutToolService.requestPayoutTool(
                shop ? (pick(shop, ['contractID', 'payoutToolID']) as PayoutToolParams) : null
            );
        });
    }

    cancelCreation(): void {
        this.cancel.emit();
    }

    createShop(): void {
        const { shopDetails, bankAccountType, newBankAccount, contract } = this.form.value;
        let bankAccount$: Observable<BankAccount> = of(newBankAccount);
        let payoutToolId$: Observable<string> = of<string>(null);

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
                        contract,
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
