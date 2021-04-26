import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { BankAccount, PayoutTool, Shop } from '@dsh/api-codegen/capi';

import { FetchShopsService } from '../../services/fetch-shops/fetch-shops.service';
import { ShopPayoutToolDetailsService } from '../../services/shop-payout-tool-details/shop-payout-tool-details.service';
import {
    BANK_ACCOUNT_TYPE_FIELD,
    BANK_SHOP_ID_FIELD,
    CONTRACT_FORM_FIELD,
    NEW_BANK_ACCOUNT_ACCOUNT_FIELD,
    NEW_BANK_ACCOUNT_BANK_BIK_FIELD,
    NEW_BANK_ACCOUNT_BANK_NAME_FIELD,
    NEW_BANK_ACCOUNT_BANK_POST_ACCOUNT_FIELD,
    NEW_BANK_ACCOUNT_FIELD,
    NEW_BANK_ACCOUNT_SEARCH_FIELD,
} from './consts';
import { CreateRussianShopEntityService } from './services/create-russian-shop-entity/create-russian-shop-entity.service';
import { BankAccountType } from './types/bank-account-type';
import { RussianShopCreateData } from './types/russian-shop-create-data';
import { RussianShopEntity } from './types/russian-shop-entity';

@UntilDestroy()
@Component({
    selector: 'dsh-create-russian-shop-entity',
    templateUrl: 'create-russian-shop-entity.component.html',
    styleUrls: ['create-russian-shop-entity.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreateRussianShopEntityService],
})
export class CreateRussianShopEntityComponent implements OnInit, AfterViewInit {
    @ViewChild('content', { static: false, read: ElementRef }) contentRef: ElementRef<HTMLElement>;

    @Output() cancel = new EventEmitter<void>();
    @Output() send = new EventEmitter<void>();

    form: FormGroup = this.fb.group({
        url: '',
        name: '',
        [BANK_ACCOUNT_TYPE_FIELD]: '',
        [NEW_BANK_ACCOUNT_FIELD]: this.fb.group({
            [NEW_BANK_ACCOUNT_SEARCH_FIELD]: '',
            [NEW_BANK_ACCOUNT_BANK_NAME_FIELD]: ['', Validators.required],
            [NEW_BANK_ACCOUNT_BANK_BIK_FIELD]: ['', Validators.required],
            [NEW_BANK_ACCOUNT_BANK_POST_ACCOUNT_FIELD]: ['', Validators.required],
            [NEW_BANK_ACCOUNT_ACCOUNT_FIELD]: ['', Validators.required],
        }),
        [BANK_SHOP_ID_FIELD]: ['', Validators.required],
        [CONTRACT_FORM_FIELD]: [null, Validators.required],
    });

    payoutTool$: Observable<PayoutTool> = this.payoutToolService.shopPayoutTool$;

    get contentElement(): HTMLElement | undefined {
        return this.contentRef?.nativeElement?.parentElement;
    }

    constructor(
        private fb: FormBuilder,
        private createShopRussianLegalEntityService: CreateRussianShopEntityService,
        private shopService: FetchShopsService,
        private payoutToolService: ShopPayoutToolDetailsService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.form
            .get(BANK_SHOP_ID_FIELD)
            .valueChanges.pipe(
                withLatestFrom(this.shopService.allShops$),
                map(([shopID, shops]: [string, Shop[]]) => shops.find(({ id }: Shop) => id === shopID)),
                filter(Boolean),
                untilDestroyed(this)
            )
            .subscribe(({ contractID, payoutToolID }: Shop) => {
                this.payoutToolService.requestPayoutTool({ contractID, payoutToolID });
            });
    }

    ngAfterViewInit(): void {
        // need to provide scrollable window to autocomplete, to remove autocomplete scrollbug
        this.cdr.detectChanges();
    }

    cancelCreation(): void {
        this.cancel.emit();
    }

    createShop(): void {
        const { url, name, bankAccountType, newBankAccount, contract } = this.form.value as RussianShopEntity;
        let bankAccount$: Observable<BankAccount> = of(newBankAccount);
        let payoutToolID$: Observable<string | null> = of(null);

        if (bankAccountType === BankAccountType.Existing) {
            bankAccount$ = this.payoutTool$.pipe(map(({ details }: PayoutTool) => (details as any) as BankAccount));
            payoutToolID$ = this.payoutTool$.pipe(map(({ id }: PayoutTool) => id));
        }

        bankAccount$
            .pipe(
                withLatestFrom(payoutToolID$),
                map(([bankAccount, payoutToolID]: [BankAccount, string | null]) => {
                    return {
                        url,
                        name,
                        contract,
                        payoutToolID,
                        bankAccount,
                    };
                }),
                switchMap((createData: RussianShopCreateData) => {
                    return this.createShopRussianLegalEntityService.createShop(createData);
                }),
                take(1)
            )
            .subscribe(
                ({ id }) => {
                    this.send.emit();
                    this.router.navigate(['claim', id]);
                },
                (err) => {
                    console.error(err);
                    this.snackBar.open(this.transloco.translate('commonError'), 'OK');
                }
            );
    }
}
